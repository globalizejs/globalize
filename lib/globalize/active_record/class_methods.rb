module Globalize
  module ActiveRecord
    module ClassMethods
      delegate :translated_locales, :set_translations_table_name, :to => :translation_class

      def with_locales(*locales)
        all.merge translation_class.with_locales(*locales)
      end

      def with_translations(*locales)
        locales = translated_locales if locales.empty?
        preload(:translations).joins(:translations).readonly(false).with_locales(locales)
      end

      def with_required_attributes
        warn 'with_required_attributes is deprecated and will be removed in the next release of Globalize.'
        required_translated_attributes.inject(all) do |scope, name|
          scope.where("#{translated_column_name(name)} IS NOT NULL")
        end
      end

      def with_translated_attribute(name, value, locales = Globalize.fallbacks)
        with_translations.where(
          translated_column_name(name)    => value,
          translated_column_name(:locale) => Array(locales).map(&:to_s)
        )
      end

      def translated?(name)
        translated_attribute_names.include?(name.to_sym)
      end

      def required_attributes
        warn 'required_attributes is deprecated and will be removed in the next release of Globalize.'
        validators.map { |v| v.attributes if v.is_a?(ActiveModel::Validations::PresenceValidator) }.flatten
      end

      def required_translated_attributes
        warn 'required_translated_attributes is deprecated and will be removed in the next release of Globalize.'
        translated_attribute_names & required_attributes
      end

      def translation_class
        @translation_class ||= begin
          klass = self.const_get(:Translation) rescue nil
          if klass.nil? || klass.class_name != (self.class_name + "Translation")
            klass = self.const_set(:Translation, Class.new(Globalize::ActiveRecord::Translation))
          end

          klass.belongs_to :globalized_model, :class_name => self.name, :foreign_key => translation_options[:foreign_key]
          klass
        end
      end

      def translations_table_name
        translation_class.table_name
      end

      def translated_column_name(name)
        "#{translation_class.table_name}.#{name}"
      end

      private

      # Override the default relation method in order to return a subclass
      # of ActiveRecord::Relation with custom finder methods for translated
      # attributes.
      def relation
        super.extending!(QueryMethods)
      end

      protected

      def define_translated_attr_reader(name)
        define_method(name) do |*args|
          Globalize::Interpolation.interpolate(name, self, args)
        end
        alias_method :"#{name}_before_type_cast", name
      end

      def define_translated_attr_writer(name)
        define_method(:"#{name}=") do |value|
          write_attribute(name, value)
        end
      end

      def define_translated_attr_accessor(name)
        define_translated_attr_reader(name)
        define_translated_attr_writer(name)
      end

      def define_translations_reader(name)
        define_method(:"#{name}_translations") do
          hash = translated_attribute_by_locale(name)
          globalize.stash.keys.each_with_object(hash) do |locale, result|
            result[locale] = globalize.fetch_stash(locale, name) if globalize.stash_contains?(locale, name)
          end
        end
      end

      def define_translations_writer(name)
        define_method(:"#{name}_translations=") do |value|
          value.each do |(locale, value)|
            write_attribute name, value, :locale => locale
          end
        end
      end

      def define_translations_accessor(name)
        define_translations_reader(name)
        define_translations_writer(name)
      end
    end
  end
end
