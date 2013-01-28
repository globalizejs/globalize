module Globalize
  module ActiveRecord
    class Adapter
      # The cache caches attributes that already were looked up for read access.
      # The stash keeps track of new or changed values that need to be saved.
      attr_accessor :record, :stash, :translations
      private :record=, :stash=

      delegate :translation_class, :to => :'record.class'

      def initialize(record)
        self.record = record
        self.stash = Attributes.new
      end

      def fetch_stash(locale, name)
        value = stash.read(locale, name)
        return value if value
        return nil
      end

      def stash_contains?(locale, name)
        stash.contains?(locale, name)
      end

      def fetch(locale, name)
        record.globalize_fallbacks(locale).each do |fallback|
          value = stash.contains?(fallback, name) ? fetch_stash(fallback, name) : fetch_attribute(fallback, name)

          unless fallbacks_for?(value)
            set_metadata(value, :locale => fallback, :requested_locale => locale)
            return value
          end
        end

        return nil
      end

      def write(locale, name, value)
        stash.write(locale, name, value)
      end

      def save_translations!
        existing_translations_by_locale = {}
        record.translations.each do |t|
          existing_translations_by_locale[t.locale.to_s] = t
        end
        
        stash.each do |locale, attrs|
          if attrs.any?
            locale_str = locale.to_s
            translation = existing_translations_by_locale[locale_str] ||
              record.translations.find_or_initialize_by_locale(locale_str)
            attrs.each { |name, value| translation[name] = value }
            translation.save!
          end
        end

        reset
      end

      def reset
        stash.clear
      end

    protected

      def type_cast(name, value)
        if value.nil?
          nil
        elsif column = column_for_attribute(name)
          column.type_cast(value)
        else
          value
        end
      end

      def column_for_attribute(name)
        translation_class.columns_hash[name.to_s]
      end

      def unserializable_attribute?(name, column)
        column.text? && translation_class.serialized_attributes[name.to_s]
      end

      def fetch_attribute(locale, name)
        translation = record.translation_for(locale, false)
        return translation && translation.send(name)
      end

      def set_metadata(object, metadata)
        object.translation_metadata.merge!(metadata) if object.respond_to?(:translation_metadata)
        object
      end

      def translation_metadata_accessor(object)
        return if obj.respond_to?(:translation_metadata)
        class << object; attr_accessor :translation_metadata end
        object.translation_metadata ||= {}
      end

      def fallbacks_for?(object)
        object.nil? || (fallbacks_for_empty_translations? && object.blank?)
      end

      def fallbacks_for_empty_translations?
        record.fallbacks_for_empty_translations
      end
    end
  end
end
