module Globalize
  module ActiveRecord
    class Adapter
      # The cache caches attributes that already were looked up for read access.
      # The stash keeps track of new or changed values that need to be saved.
      attr_reader :record, :cache, :stash

      delegate :translation_class, :to => :'record.class'

      def initialize(record)
        @record = record
        @cache = Attributes.new
        @stash = Attributes.new
      end

      def fetch(locale, name)
        if cache.contains?(locale, name)
          type_cast(name, cache.read(locale, name))
        else
          cache.write(locale, name, fetch_attribute(locale, name))
        end
      end

      def write(locale, name, value)
        stash.write(locale, name, value)
        cache.write(locale, name, value)
      end

      def save_translations!
        stash.each do |locale, attrs|
          translation = record.translations.find_or_initialize_by_locale(locale.to_s)
          attrs.each { |name, value| translation[name] = value }
          translation.save!
        end
        stash.clear
      end

      def reset
        cache.clear
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

        def fetch_translation(locale)
          locale = locale.to_sym
          if record.translations.loaded?
            record.translations.detect { |t| t.locale == locale }
          else
            record.translations.with_locales(locale)
          end
        end

        def fetch_translations(locale)
          # only query if not already included with :include => translations
          if record.translations.loaded?
            record.translations
          else
            record.translations.with_locales(Globalize.fallbacks(locale))
          end
        end

        def fetch_attribute(locale, name)
          translations = fetch_translations(locale)
          value, requested_locale = nil, locale

          Globalize.fallbacks(locale).each do |fallback|
            translation = translations.to_a.detect { |t| t.locale == fallback }
            value  = translation && translation.send(name)
            locale = fallback && break if value
          end

          set_metadata(value, :locale => locale, :requested_locale => requested_locale)
          value
        end

        def set_metadata(object, metadata)
          if object.respond_to?(:translation_metadata)
            object.translation_metadata.merge!(meta_data)
          end
        end

        def translation_metadata_accessor(object)
          return if obj.respond_to?(:translation_metadata)
          class << object; attr_accessor :translation_metadata end
          object.translation_metadata ||= {}
        end
    end
  end
end
