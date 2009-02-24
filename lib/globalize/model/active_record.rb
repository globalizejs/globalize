require 'globalize/translation'
require 'globalize/locale/fallbacks'
require 'globalize/model/active_record/adapter'
require 'globalize/model/active_record/translated'

module Globalize
  module Model
    module ActiveRecord
      class << self                
        def create_proxy_class(klass)
          Object.const_set "#{klass.name}Translation", Class.new(::ActiveRecord::Base){
            belongs_to "#{klass.name.underscore}".intern
            
            def locale
              read_attribute(:locale).to_sym
            end
            
            def locale=(locale)
              write_attribute(:locale, locale.to_s)
            end
          }
        end

        def define_accessors(klass, attr_names)
          attr_names.each do |attr_name|
            klass.send :define_method, attr_name, lambda {
              globalize.fetch self.class.locale, attr_name
            }
            klass.send :define_method, "#{attr_name}=", lambda {|val|
              globalize.stash self.class.locale, attr_name, val
              self[attr_name] = val
            }
          end
        end
      end
    end
  end
end