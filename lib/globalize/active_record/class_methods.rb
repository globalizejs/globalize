module Globalize
  module ActiveRecord
    module ClassMethods
      delegate :translated_locales, :set_translations_table_name, :to => :translation_class

      def with_locales(*locales)
        scoped & translation_class.with_locales(*locales)
      end

      def with_translations(*locales)
        locales = translated_locales if locales.empty?
        includes(:translations).with_locales(locales).with_required_attributes
      end

      def with_required_attributes
        required_translated_attributes.inject(scoped) do |scope, name|
          scope.where("#{translated_column_name(name)} IS NOT NULL")
        end
      end

      def with_translated_attribute(name, value, locales = nil)
        locales ||= Globalize.fallbacks
        with_translations.where(
          translated_column_name(name)    => value,
          translated_column_name(:locale) => locales.map(&:to_s)
        )
      end

      def required_attributes
        validators.map { |v| v.attributes if v.is_a?(ActiveModel::Validations::PresenceValidator) }.flatten
      end

      def required_translated_attributes
        translated_attribute_names & required_attributes
      end

      def translation_class
        klass = const_get(:Translation) rescue const_set(:Translation, Class.new(Translation))
        if klass.table_name == 'translations'
          klass.set_table_name(translation_options[:table_name])
          klass.belongs_to name.underscore.gsub('/', '_')
        end
        klass
      end

      def translations_table_name
        translation_class.table_name
      end

      def translated_column_name(name)
        "#{translation_class.table_name}.#{name}"
      end

      def respond_to?(method, *args, &block)
        method.to_s =~ /^find_by_(\w+)$/ && translated_attribute_names.include?($1.to_sym) || super
      end

      def method_missing(method, *args)
        if method.to_s =~ /^find_(first_|)by_(\w+)$/ && translated_attribute_names.include?($2.to_sym)
          result = with_translated_attribute($2, args.first)
          $1 == 'first_' ? result.first : result.all
        else
          super
        end
      end

      protected

        def translated_attr_accessor(name)
          define_method :"#{name}=", lambda { |value|
            globalize.write(Globalize.locale, name, value)
            self[name] = value
          }
          define_method name, lambda { |*args|
            globalize.fetch(args.first || Globalize.locale, name)
          }
          alias_method :"#{name}_before_type_cast", name
        end
    end
  end
end