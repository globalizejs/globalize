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
              fallbacks = globalize_compute_fallbacks(locale)
              translation_recs = globalize_translations.by_locales(fallbacks)
              val = nil; real_locale = locale
              
              # Walk through the fallbacks, starting with the current locale itself, and moving
              # to the next best choice, until we find a match.
              # Check the @globalize_set_translations cache first to see if we've just changed the attribute and not saved yet.
              fallbacks.each do |fallback|
                val = @globalize_set_translations && @globalize_set_translations[fallback] && @globalize_set_translations[fallback][attr_name]
                unless val
                  translation_rec = translation_recs.detect {|tr| tr.locale == fallback }
                  val = translation_rec && translation_rec.send(attr_name)
                end
                if val
                  real_locale = fallback
                  break
                end
              end
              val &&= Globalize::AttributeTranslation.new( val, :locale => real_locale, 
                :requested_locale => locale )
            }
            define_method "#{attr_name}=", lambda {|val|
              @globalize_set_translations ||= Hash.new
              @globalize_set_translations[I18n.locale] ||= Hash.new
              @globalize_set_translations[I18n.locale][attr_name] = val
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
          return unless @globalize_set_translations
          @globalize_set_translations.each do |locale, attrs|
            translation_rec = globalize_translations.find_or_initialize_by_locale locale
            attrs.each do |attr_name, val|
              translation_rec[attr_name] = val
            end
            translation_rec.save!
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
