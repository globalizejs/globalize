module Globalize
  class MigrationError < StandardError; end
  class MigrationMissingTranslatedField < MigrationError; end
  class BadMigrationFieldType < MigrationError; end

  module ActiveRecord
    autoload :Adapter,      'globalize/active_record/adapter'
    autoload :Attributes,   'globalize/active_record/attributes'
    autoload :Migration,    'globalize/active_record/migration'

    def self.included(base)
      base.extend ActMacro
    end

    class << self
      def build_translation_class(target, options)
        options[:table_name] ||= "#{target.table_name.singularize}_translations"

        klass = target.const_defined?(:Translation) ?
          target.const_get(:Translation) :
          target.const_set(:Translation, Class.new(::ActiveRecord::Base))

        klass.class_eval do
          set_table_name(options[:table_name])
          belongs_to target.name.underscore.gsub('/', '_')
          def locale; read_attribute(:locale).to_sym; end
          def locale=(locale); write_attribute(:locale, locale.to_s); end
        end

        klass
      end
    end

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
        self.translation_class = ActiveRecord.build_translation_class(self, options)
        self.translated_attribute_names = attr_names.map(&:to_sym)

        include InstanceMethods
        extend  ClassMethods, Migration

        after_save :save_translations!
        has_many :translations, :class_name  => translation_class.name,
                                :foreign_key => class_name.foreign_key,
                                :dependent   => :delete_all,
                                :extend      => HasManyExtensions

        named_scope :with_translations, lambda { |locale|
          conditions = required_attributes.map do |attribute|
            "#{quoted_translation_table_name}.#{attribute} IS NOT NULL"
          end
          conditions << "#{quoted_translation_table_name}.locale = ?"
          { :include => :translations, :conditions => [conditions.join(' AND '), locale] }
        }

        attr_names.each { |attr_name| translated_attr_accessor(attr_name) }
      end

      def translates?
        included_modules.include?(InstanceMethods)
      end
    end

    module HasManyExtensions
      def by_locale(locale)
        first(:conditions => { :locale => locale.to_s })
      end

      def by_locales(locales)
        all(:conditions => { :locale => locales.map(&:to_s) })
      end
    end

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
        validations = reflect_on_all_validations.select do |validation|
          validation.macro == :validates_presence_of
        end.map(&:name)
      end

      def respond_to?(method)
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
          find(:first, :joins => :translations, :conditions => [query, value, locales])
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

    module InstanceMethods
      def globalize
        @globalize ||= Adapter.new self
      end

      def attributes=(attributes, *args)
        if attributes.respond_to?(:delete) && locale = attributes.delete(:locale)
          self.class.with_locale(locale) { super }
        else
          super
        end
      end

      def available_locales
        translations.scoped(:select => 'DISTINCT locale').map(&:locale)
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
