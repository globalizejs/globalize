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
    autoload :Translation,     'globalize/active_record/translation'
  end
end
