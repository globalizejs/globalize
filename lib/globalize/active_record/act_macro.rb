module Globalize
  module ActiveRecord
    module ActMacro
      def translates(*attr_names)
        options = attr_names.extract_options!
        # Bypass setup_translates! if the initial bootstrapping is done already.
        setup_translates!(options) unless translates?

        # Add any extra translatable attributes.
        attr_names = attr_names.map(&:to_sym)
        attr_names -= translated_attribute_names if defined?(translated_attribute_names)

        allow_translation_of_attributes(attr_names) if attr_names.present?
      end

      def class_name
        @class_name ||= begin
          class_name = table_name[table_name_prefix.length..-(table_name_suffix.length + 1)].downcase.camelize
          pluralize_table_names ? class_name.singularize : class_name
        end
      end

      def translates?
        included_modules.include?(InstanceMethods)
      end

      protected

      def allow_translation_of_attributes(attr_names)
        attr_names.each do |attr_name|
          # Detect and apply serialization.
          enable_serializable_attribute(attr_name)

          # Create accessors for the attribute.
          define_translated_attr_accessor(attr_name)
          define_translations_accessor(attr_name)

          # Add attribute to the list.
          self.translated_attribute_names << attr_name
        end
      end

      def apply_globalize_options(options)
        options[:table_name] ||= "#{table_name.singularize}_translations"
        options[:foreign_key] ||= class_name.foreign_key

        class_attribute :translated_attribute_names, :translation_options, :fallbacks_for_empty_translations
        self.translated_attribute_names = []
        self.translation_options        = options
        self.fallbacks_for_empty_translations = options[:fallbacks_for_empty_translations]
      end

      def enable_serializable_attribute(attr_name)
        serializer = self.serialized_attributes[attr_name.to_s]
        if serializer.present?
          if defined?(::ActiveRecord::Coders::YAMLColumn) &&
             serializer.is_a?(::ActiveRecord::Coders::YAMLColumn)

            serializer = serializer.object_class
          end

          translation_class.send :serialize, attr_name, serializer
        end
      end

      def setup_translates!(options)
        apply_globalize_options(options)

        include InstanceMethods
        extend  ClassMethods, Migration

        translation_class.table_name = options[:table_name]

        has_many :translations, :class_name  => translation_class.name,
                                :foreign_key => options[:foreign_key],
                                :dependent   => :destroy,
                                :extend      => HasManyExtensions,
                                :autosave    => false

        after_create :save_translations!
        after_update :save_translations!
      end
    end

    module HasManyExtensions
      def find_or_initialize_by_locale(locale)
        with_locale(locale.to_s).first || build(:locale => locale.to_s)
      end
    end
  end
end
