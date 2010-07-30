module Globalize
  class MigrationError < StandardError; end
  class MigrationMissingTranslatedField < MigrationError; end
  class BadMigrationFieldType < MigrationError; end

  module ActiveRecord
    autoload :ActMacro,        'globalize/active_record/act_macro'
    autoload :Adapter,         'globalize/active_record/adapter'
    autoload :Attributes,      'globalize/active_record/attributes'
    autoload :ClassMethods,    'globalize/active_record/class_methods'
    autoload :InstanceMethods, 'globalize/active_record/instance_methods'
    autoload :Migration,       'globalize/active_record/migration'

    class << self
      def build_translation_class(target, options)
        options[:table_name] ||= "#{target.table_name.singularize}_translations"

        klass = target.const_defined?(:Translation) ?
          target.const_get(:Translation) :
          target.const_set(:Translation, Class.new(::ActiveRecord::Base))

        klass.class_eval do
          set_table_name(options[:table_name])
          
          belongs_to target.name.underscore.gsub('/', '_')
          
          class << self
            def by_locale(locale)
              where(:locale => locale.to_s)
            end

            def by_locales(locales)
              where(:locale => locales.map(&:to_s))
            end

            # TODO build is not defined here even when called through record.translations.find_or_initialize_by_locale(...)
            # def find_or_initialize_by_locale(locale)
            #   by_locale(locale.to_s).first || build(:locale => locale.to_s)
            # end
          end
          
          def locale
            read_attribute(:locale).to_sym
          end
          
          def locale=(locale)
            write_attribute(:locale, locale.to_s)
          end
        end

        klass
      end
    end
  end
end
