module Globalize
  module ActiveRecord
    module InstanceMethods
      delegate :available_locales, :to => :translations

      def globalize
        @globalize ||= Adapter.new self
      end

      def attributes
        self.attribute_names.inject({}) do |attrs, name|
          attrs[name] = read_attribute(name) ||
            (globalize.fetch(I18n.locale, name) rescue nil)
          attrs
        end
      end

      def attributes=(attributes, *args)
        if locale = attributes.try(:delete, :locale)
          self.class.with_locale(locale) { super }
        else
          super
        end
      end

      def attribute_names
        translated_attribute_names.map(&:to_s) + super
      end

      def translated_locales
        translations.map(&:locale)
      end

      def translated_attributes
        translated_attribute_names.inject({}) do |attributes, name|
          attributes.merge(name => send(name))
        end
      end

      def set_translations(options)
        options.keys.each do |locale|
          translation = translations.find_by_locale(locale.to_s) ||
            translations.build(:locale => locale.to_s)
          translation.update_attributes!(options[locale])
        end
      end

      def reload(options = nil)
        translated_attribute_names.each { |name| @attributes.delete(name.to_s) }
        globalize.reset
        super(options)
      end

      protected

        def save_translations!
          globalize.save_translations!
        end
    end
  end
end