module Globalize
  module ActiveRecord
    class Adapter
      # The cache caches attributes that already were looked up for read access.
      # The stash keeps track of new or changed values that need to be saved.
      attr_accessor :record, :stash
      private :record=, :stash=

      delegate :translation_class, :to => :'record.class'

      def initialize(record)
        self.record = record
        self.stash = Attributes.new
      end

      def fetch_stash(locale, name)
        value = stash.read(locale, name)
        return value if value
        return nil
      end

      def fetch(locale, name)
        Globalize.fallbacks(locale).each do |fallback|
          value = fetch_stash(fallback, name) || fetch_attribute(fallback, name)

          if value
            set_metadata(value, :locale => fallback, :requested_locale => locale)
            return value
          end
        end
        return nil
      end

      def write(locale, name, value)
        stash.write(locale, name, value)
      end

      def save_translations!
        stash.each do |locale, attrs|
          translation = record.translations.find_or_initialize_by_locale(locale.to_s)
          attrs.each { |name, value| translation[name] = value }
          translation.save!
        end
        record.translations.reset
        stash.clear
      end

      def reset
        stash.clear
      end

      protected

      def type_cast(name, value)
        if value.nil?
          nil
        elsif column = column_for_attribute(name)
          column.type_cast(value)
        else
          value
        end
      end

      def column_for_attribute(name)
        translation_class.columns_hash[name.to_s]
      end

      def unserializable_attribute?(name, column)
        column.text? && translation_class.serialized_attributes[name.to_s]
      end

      def fetch_translations(locale) # change to take array
        # only query if not already included with :include => translations
        if record.translations.loaded?
          record.translations
        else
          # retrieves but does not store the translations!
          record.translations.with_locales(Globalize.fallbacks(locale))
        end
      end

      def fetch_attribute(locale, name)
        translations = fetch_translations(locale) # TODO move up
        translation = translations.to_a.detect { |t| t.locale == locale }
        return translation && translation.send(name)
      end

      def set_metadata(object, metadata)
        object.translation_metadata.merge!(meta_data) if object.respond_to?(:translation_metadata)
        object
      end

      def translation_metadata_accessor(object)
        return if obj.respond_to?(:translation_metadata)
        class << object; attr_accessor :translation_metadata end
        object.translation_metadata ||= {}
      end
    end
  end
end
