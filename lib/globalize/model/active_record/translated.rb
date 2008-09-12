module Globalize
  module Model
    module ActiveRecord        
      module Translated
        def self.included(base)
          base.extend ActMethods
        end
            
        module ActMethods
          def translates(*attr_names)
            options = attr_names.extract_options!
            options[:translated_attributes] = attr_names

            # Only set up once per class
            unless included_modules.include? InstanceMethods
              class_inheritable_accessor :globalize_options
              include InstanceMethods
             
              proxy_class = Globalize::Model::ActiveRecord.create_proxy_class(self)
              has_many :globalize_translations, :class_name => proxy_class.name do
                def by_locales(locales)
                  find :all, :conditions => { :locale => locales }
                end
              end
            
              after_save do |record|
                record.globalize.update_translations!
              end
            end

            self.globalize_options = options
            Globalize::Model::ActiveRecord.define_accessors(self, attr_names)
          end
        end
      
        module InstanceMethods
          def globalize
            @globalize ||= Adapter.new self
          end
        end
      end      
    end
  end
end