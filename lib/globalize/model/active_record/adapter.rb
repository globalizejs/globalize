module Globalize
  module Model
    class AttributeStash < Hash
      def read(locale, attr_name)
        self[locale] ||= {}
        self[locale][attr_name]
      end
      
      def write(locale, attr_name, value)
        self[locale] ||= {}
        self[locale][attr_name] = value
      end
    end
    
    class Adapter
      def initialize(record)
        @record = record
        @cache = AttributeStash.new
        @stash = AttributeStash.new
      end
      
      def fetch(locale, attr_name)
        locale = I18n.locale 
        @cache.read(locale, attr_name) || begin
          value = fetch_attribute locale, attr_name
          @cache.write locale, attr_name, value
        end
      end
      
      def stash(locale, attr_name, value)
        @stash.write locale, attr_name, value
      end
      
      def update_translations!
        @stash.each do |locale, attrs|
          translation = @record.globalize_translations.find_or_initialize_by_locale(locale)
          attrs.each{|attr_name, value| translation[attr_name] = value }
          translation.save!
        end
      end
      
      private
      
      def fetch_attribute(locale, attr_name)
        fallbacks = I18n.fallbacks[locale].map{|tag| tag.to_s}
        translations = @record.globalize_translations.by_locales(fallbacks)
        result, requested_locale = nil, locale
      
        # Walk through the fallbacks, starting with the current locale itself, and moving
        # to the next best choice, until we find a match.
        # Check the @globalize_set_translations cache first to see if we've just changed the 
        # attribute and not saved yet.
        fallbacks.each do |fallback|
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
