module Globalize
  module ActiveRecord
    module AdapterDirty
      extend ActiveSupport::Concern
      included do
        alias_method_chain :write, :dirty
        alias_method_chain :reset, :dirty
      end
      def write_with_dirty locale, name, value
        # Dirty tracking, paraphrased from
        # ActiveRecord::AttributeMethods::Dirty#write_attribute.
        name = name.to_s
        store_old_value name, locale
        old_values = dirty[name]
        old_value = old_values[locale]
        is_changed = record.send :attribute_changed?, name
        if is_changed && value == old_value
          # If there's already a change, delete it if this undoes the change.
          old_values.delete locale
          if old_values.empty?
            _reset_attribute name
          end
        elsif !is_changed
          # If there's not a change yet, record it.
          record.send(:attribute_will_change!, name) if old_value != value
        end

        write_without_dirty locale, name, value
      end

      attr_writer :dirty
      def dirty
        @dirty ||= {}
      end

      def store_old_value name, locale
        dirty[name] ||= {}
        unless dirty[name].key? locale
          old = fetch(locale, name)
          old = old.dup if old.duplicable?
          dirty[name][locale] = old
        end
      end
      def clear_dirty
        self.dirty = {}
      end

      RESET_METHOD = if defined?(::Rails::VERSION::STRING)
        ::Rails::VERSION::STRING.split('.').first.to_i > 4 ? :restore_attribute! : :reset_attribute!
      else
        :reset_attribute!
      end
      def _reset_attribute name
        record.send(RESET_METHOD, name) if record.respond_to? RESET_METHOD, true
      end

      def reset_with_dirty
        clear_dirty
        reset_without_dirty
      end
    end
  end
end
