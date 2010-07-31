module Globalize
  module ActiveRecord
    module ActMacro
      def translates(*attr_names)
        return if translates?

        options = attr_names.extract_options!
        options[:table_name] ||= "#{table_name.singularize}_translations"

        include InstanceMethods
        extend  ClassMethods, Migration

        class_inheritable_accessor :translated_attribute_names, :translation_options
        class_inheritable_writer   :required_attributes

        self.translated_attribute_names = attr_names.map(&:to_sym)
        self.translation_options        = options

        after_save :save_translations!

        has_many :translations, :class_name  => translation_class.name,
                                :foreign_key => class_name.foreign_key,
                                :dependent   => :delete_all,
                                :extend      => HasManyExtensions

        attr_names.each { |attr_name| translated_attr_accessor(attr_name) }
      end

      def class_name
        class_name = table_name[table_name_prefix.length..-(table_name_suffix.length + 1)].camelize
        pluralize_table_names ? class_name.singularize : class_name
      end

      def translates?
        included_modules.include?(InstanceMethods)
      end
    end

    module HasManyExtensions
      def find_or_initialize_by_locale(locale)
        with_locale(locale.to_s).first || build(:locale => locale.to_s)
      end
    end
  end
end