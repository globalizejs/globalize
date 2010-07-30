module Globalize
  module ActiveRecord
    module ActMacro
      def locale
        (defined?(@@locale) && @@locale)
      end

      def locale=(locale)
        @@locale = locale
      end

      def translates(*attr_names)
        return if translates?
        options = attr_names.extract_options!

        class_inheritable_accessor :translation_class, :translated_attribute_names
        class_inheritable_writer :required_attributes

        self.translation_class = ActiveRecord.build_translation_class(self, options)
        self.translated_attribute_names = attr_names.map(&:to_sym)

        include InstanceMethods
        extend  ClassMethods, Migration

        after_save :save_translations!
        has_many :translations, :class_name  => translation_class.name,
                                :foreign_key => class_name.foreign_key,
                                :dependent   => :delete_all

        scope :with_translations, lambda { |locale|
          conditions = required_attributes.map do |attribute|
            "#{quoted_translation_table_name}.#{attribute} IS NOT NULL"
          end
          conditions << "#{quoted_translation_table_name}.locale = ?"
          { :include => :translations, :conditions => [conditions.join(' AND '), locale] }
        }

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
  end
end