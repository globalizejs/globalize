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
        (defined?(@@locale) && @@locale) || I18n.locale
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

        after_save :save_translations!
        has_many :translations, :class_name  => translation_class.name,
                                :foreign_key => class_name.foreign_key,
                                :dependent   => :delete_all,
                                :extend      => HasManyExtensions

        include InstanceMethods
        extend  ClassMethods, Migration

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

      def translation_table_name
        translation_class.table_name
      end

      def respond_to?(method)
        method.to_s =~ /^find_by_(\w+)$/ && translated_attribute_names.include?($1.to_sym) || super
      end

      def method_missing(method, *args)
        if method.to_s =~ /^find_by_(\w+)$/ && translated_attribute_names.include?($1.to_sym)
          find(:first, :joins => :translations, :conditions => [
            "#{translated_attr_name($1)} = ? AND #{translated_attr_name('locale')} IN (?)",
            args.first, Globalize.fallbacks(locale).map(&:to_s)])
        else
          super
        end
      end

      protected

        def translated_attr_accessor(name)
          define_method "#{name}=", lambda { |value|
            globalize.write(self.class.locale, name, value)
            self[name] = value
          }
          define_method name, lambda {
            globalize.fetch(self.class.locale, name)
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

      def available_locales
        translations.scoped(:select => 'DISTINCT locale').map do |translation|
          translation.locale.to_sym
        end
      end

      def translated_attributes
        translated_attribute_names.inject({}) do |attributes, name|
          attributes.merge(name => send(name))
        end
      end

      def set_translations(options)
        options.keys.each do |key|
          translation = translations.find_by_locale(key.to_s) ||
            translations.build(:locale => key.to_s)
          translation.update_attributes!(options[key])
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
