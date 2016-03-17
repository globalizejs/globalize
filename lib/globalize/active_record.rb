module Globalize
  module ActiveRecord
    autoload :ActMacro,        'globalize/active_record/act_macro'
    autoload :Adapter,         'globalize/active_record/adapter'
    autoload :AdapterDirty,    'globalize/active_record/adapter_dirty'
    autoload :Attributes,      'globalize/active_record/attributes'
    autoload :ClassMethods,    'globalize/active_record/class_methods'
    autoload :Exceptions,      'globalize/active_record/exceptions'
    autoload :InstanceMethods, 'globalize/active_record/instance_methods'
    autoload :Migration,       'globalize/active_record/migration'
    autoload :Translation,     'globalize/active_record/translation'
    autoload :QueryMethods,    'globalize/active_record/query_methods'
  end
end
