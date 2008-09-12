require 'globalize/model/active_record/adapter'
require 'globalize/model/active_record/translated'
require 'globalize/model/attribute_translation'
require 'globalize/locale/fallbacks'

module Globalize
  module Model
    module ActiveRecord        
      class << self        
        def create_proxy_class(klass)
          Object.const_set "#{klass.name}Translation", Class.new(::ActiveRecord::Base){
            belongs_to "#{klass.name.underscore}".intern
          }
        end
        
        def define_accessors(klass, attr_names)
          attr_names.each do |attr_name|
            klass.send :define_method, attr_name, lambda {
              globalize.fetch I18n.locale, attr_name
            }
            klass.send :define_method, "#{attr_name}=", lambda {|val|
              globalize.stash.write I18n.locale, attr_name, val
            }
          end 
        end
      end
    end
  end
end