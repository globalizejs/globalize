module Globalize
  module ActiveRecord
    module ClassMethods
      delegate :set_translation_table_name, :to => :translation_class

      def with_locale(locale)
        previous_locale, self.locale = self.locale, locale
        result = yield
        self.locale = previous_locale
        result
      end

      def translation_table_name
        translation_class.table_name
      end

      def quoted_translation_table_name
        translation_class.quoted_table_name
      end

      def required_attributes
        @required_attributes ||= reflect_on_all_validations.select do |validation|
          validation.macro == :validates_presence_of && translated_attribute_names.include?(validation.name)
        end.map(&:name)
      end

      def respond_to?(method, *args, &block)
        method.to_s =~ /^find_by_(\w+)$/ && translated_attribute_names.include?($1.to_sym) || super
      end

      def method_missing(method, *args)
        if method.to_s =~ /^find_by_(\w+)$/ && translated_attribute_names.include?($1.to_sym)
          find_first_by_translated_attr_and_locales($1, args.first)
        else
          super
        end
      end

      protected

        def find_first_by_translated_attr_and_locales(name, value)
          query = "#{translated_attr_name(name)} = ? AND #{translated_attr_name('locale')} IN (?)"
          locales = Globalize.fallbacks(locale || I18n.locale).map(&:to_s)
          find(
            :first,
            :joins => :translations,
            :conditions => [query, value, locales],
            :readonly => false
          )
        end

        def translated_attr_accessor(name)
          define_method "#{name}=", lambda { |value|
            globalize.write(self.class.locale || I18n.locale, name, value)
            self[name] = value
          }
          define_method name, lambda { |*args|
            globalize.fetch(args.first || self.class.locale || I18n.locale, name)
          }
          alias_method "#{name}_before_type_cast", name
        end

        def translated_attr_name(name)
          "#{translation_class.table_name}.#{name}"
        end
    end
  end
end