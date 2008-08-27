require 'globalize/attribute_translation'
require 'globalize/fallbacks'

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
             
            proxy_class = globalize_create_proxy_class
            has_many :globalize_translations, :class_name => proxy_class.name do
              def by_locales(locales)
                find :all, :conditions => { :locale => locales }
              end
            end
          end
          self.options = options.extract_options!
          self.options[:translated_fields] = options
          globalize_define_accessors(options)
        end

        private
        
        def globalize_define_accessors(attr_names)
          attr_names.each do |attr_name|
            define_method attr_name, lambda {
              locale = I18n.locale
              cached = @map && @map[locale] && @map[locale][attr_name]
              if cached then cached else
                fallbacks = globalize_compute_fallbacks(locale)
                gts = globalize_translations.by_locales(fallbacks)
                val = nil; real_locale = locale
                gts.sort {|a, b| 
                  fallbacks.index(a.locale) <=> fallbacks.index(b.locale) }.each do |gt|
                    val = gt.send(attr_name)
                    real_locale = gt.locale if val
                  end
                val &&= Globalize::AttributeTranslation.new( val, :locale => real_locale, 
                  :requested_locale => locale )
                send("#{attr_name}=", val)
              end
            }
            define_method "#{attr_name}=", lambda {|val|
              @map ||= Hash.new
              @map[I18n.locale] ||= Hash.new
              @map[I18n.locale][attr_name] = val
            }
          end 
        end
        
        def globalize_create_ar_class(class_name, &block)
          klass = Class.new ::ActiveRecord::Base, &block
          Object.const_set class_name, klass
          klass
        end
        
        def globalize_create_proxy_class
          original_class_name = name
          globalize_create_ar_class "#{name}Translation" do
            belongs_to "#{original_class_name.underscore}".intern
          end
        end

      end
      
      module InstanceMethods
        private
        def globalize_save_translations
          return unless @map
          @map.each do |locale, attrs|
            gt = globalize_translations.find_or_initialize_by_locale locale
            attrs.each do |attr_name, val|
              gt[attr_name] = val
            end
            gt.save!
          end
        end
  
        def globalize_compute_fallbacks(locale)
          @globalize_fallbacks ||= self.class.options[:fallbacks] || Globalize::Fallbacks.new
          @globalize_fallbacks.compute(locale)
        end
      end
        
      module ClassMethods
      end       
      
    end      
  end
end
