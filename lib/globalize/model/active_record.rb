require 'globalize/translation'
require 'globalize/locale/fallbacks'
require 'globalize/model/active_record/adapter'
require 'globalize/model/active_record/translated'

module Globalize
  module Model
    module ActiveRecord
      class << self
        def create_proxy_class(klass)
          module_names = klass.name.split('::')
          klass_name   = module_names.pop
          target       = module_names.empty? ? Object : module_names.join('::').constantize

          target.const_set "#{klass_name}Translation", Class.new(::ActiveRecord::Base) {
            belongs_to "#{klass.name.underscore.gsub('/', '_')}".intern

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
            klass.send :define_method, "#{attr_name}_before_type_cast", lambda {
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