module Globalize
  module ActiveRecord
    module Translated

      def self.included(base)
        base.extend ActMethods
      end
            
      module ActMethods
        def translates(*options)
          proxy_records = "#{name.underscore}_translations".intern
          
          # Only include once per class
          unless included_modules.include? InstanceMethods
            class_inheritable_accessor :options
            extend ClassMethods
            include InstanceMethods
             
            create_proxy_class
            has_many proxy_records

            class << self
              alias_method_chain :find, :translation
            end

          end
          self.options = options

          self.options.each do |attr_name|
            attr_accessor attr_name
          end 

        end

        private
        
        def create_ar_class(class_name, &block)
          klass = Class.new ::ActiveRecord::Base, &block
          Object.const_set class_name, klass
        end
        
        def create_proxy_class
          original_class_name = name
          create_ar_class "#{name}Translation" do
            belongs_to "#{original_class_name.underscore}".intern
          end
        end

      end
      
      module InstanceMethods
      end
  
      module ClassMethods
        def find_with_translation(*args)
          find_without_translation(*args)
        end
      end
       
    end      
  end
end
