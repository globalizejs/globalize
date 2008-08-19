module Globalize
  module ActiveRecord
    module Translated

      def self.included(base)
        base.extend ActMethods
      end
            
      module ActMethods
        def translates(*options)
          after_save :globalize_save_translations
          
          # Only include once per class
          unless included_modules.include? InstanceMethods
            class_inheritable_accessor :options
            extend ClassMethods
            include InstanceMethods
             
            proxy_class = create_proxy_class
            has_many :globalize_translations, :class_name => proxy_class.name
          end
          self.options = options

          self.options.each do |attr_name|
            iv = "@#{attr_name}"
            define_method attr_name, lambda {
              instance_variable_get(iv) || instance_variable_set( iv,
                ( gt = globalize_translations.find_by_locale(locale) ) &&
                gt.send(attr_name) )
            }
            define_method "#{attr_name}=", lambda {|val|
              instance_variable_set iv, val
            }
          end 

        end

        private
        
        def create_ar_class(class_name, &block)
          klass = Class.new ::ActiveRecord::Base, &block
          Object.const_set class_name, klass
          klass
        end
        
        def create_proxy_class
          original_class_name = name
          create_ar_class "#{name}Translation" do
            belongs_to "#{original_class_name.underscore}".intern
          end
        end

      end
      
      module InstanceMethods
        def locale; I18n.locale end   # Probably should save original locale here
        
        private
        def globalize_save_translations
          gt = globalize_translations.find_or_initialize_by_locale locale
          self.class.options.each do |attr_name|
            gt[attr_name] = send(attr_name)
          end
          gt.save
        end
      end
  
      module ClassMethods
      end       
      
    end      
  end
end
