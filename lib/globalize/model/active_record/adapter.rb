module Globalize
  module Model
    class AttributeStash < Hash
      def contains?(locale, attr_name)
        locale = locale.to_sym
        self[locale] ||= {}
        self[locale].has_key? attr_name        
      end
      
      def read(locale, attr_name)
        locale = locale.to_sym
        self[locale] ||= {}
        self[locale][attr_name]
      end
      
      def write(locale, attr_name, value)
        locale = locale.to_sym
        self[locale] ||= {}
        self[locale][attr_name] = value
      end
    end
    
    class Adapter
      def initialize(record)
        @record = record
        
        # TODO what exactly are the roles of cache and stash
        @cache = AttributeStash.new
        @stash = AttributeStash.new
      end
      
      def fetch(locale, attr_name)
        # locale = I18n.locale
        is_cached = @cache.contains?(locale, attr_name)
        is_cached ? @cache.read(locale, attr_name) : begin
          value = fetch_attribute locale, attr_name
          @cache.write locale, attr_name, value if value && value.locale == locale
          value
        end
      end
      
      def stash(locale, attr_name, value)
        @stash.write locale, attr_name, value
        @cache.write locale, attr_name, value
      end
      
      def update_translations!
        @stash.each do |locale, attrs|
          translation = @record.globalize_translations.find_or_initialize_by_locale(locale.to_s)
          attrs.each{|attr_name, value| translation[attr_name] = value }
          translation.save!
        end
        @stash.clear
      end
      
      # Clears the cache
      def clear
        @cache.clear
        @stash.clear
      end
      
      private
      
      def fetch_attribute(locale, attr_name)
        fallbacks = I18n.fallbacks[locale].map{|tag| tag.to_s}.map(&:to_sym)
        translations = @record.globalize_translations.by_locales(fallbacks)
        result, requested_locale = nil, locale

        # Walk through the fallbacks, starting with the current locale itself, and moving
        # to the next best choice, until we find a match.
        # Check the @globalize_set_translations cache first to see if we've just changed the 
        # attribute and not saved yet.
        fallbacks.each do |fallback|
          # TODO should we be checking stash or just cache?
          result = @stash.read(fallback, attr_name) || begin
            translation = translations.detect {|tr| tr.locale == fallback }
            translation && translation.send(attr_name)
          end
          if result
            locale = fallback
            break
          end
        end
        result && Translation::Attribute.new(result, :locale => locale, :requested_locale => requested_locale)
      end
    end
  end
end
