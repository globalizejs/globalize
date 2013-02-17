module Globalize
  module ActiveRecord
    module InstanceMethods
      delegate :translated_locales, :to => :translations

      def globalize
        @globalize ||= Adapter.new(self)
      end

      def attributes
        super.merge(translated_attributes)
      end

      def self.included(base)
        # Maintain Rails 3.0.x compatibility while adding Rails >= 3.1 compatibility
        # Rails >= 3.1.x support
        base.class_eval %{
          def assign_attributes(attributes)
            with_given_locale(attributes) { super }
          end
        }

        # (Mainly) Rails < 3.1 support
        base.class_eval %{
          def attributes=(attributes, *args)
            with_given_locale(attributes) { super }
          end

          def update_attributes!(attributes, *args)
            with_given_locale(attributes) { super }
          end

          def update_attributes(attributes, *args)
            with_given_locale(attributes) { super }
          end
        }
      end

      def write_attribute(name, value, options = {})
        if translated?(name)
          options = {:locale => Globalize.locale}.merge(options)

          # Dirty tracking, paraphrased from
          # ActiveRecord::AttributeMethods::Dirty#write_attribute.
          name_str = name.to_s
          if attribute_changed?(name_str)
            # If there's already a change, delete it if this undoes the change.
            old = changed_attributes[name_str]
            changed_attributes.delete(name_str) if value == old
          else
            # If there's not a change yet, record it.
            old = globalize.fetch(options[:locale], name)
            old = old.clone if old.duplicable?
            changed_attributes[name_str] = old if value != old
          end

          globalize.write(options[:locale], name, value)
        else
          super(name, value)
        end
      end

      def read_attribute(name, options = {})
        options = {:translated => true, :locale => nil}.merge(options)
        if self.class.translated?(name) and options[:translated]
          if (value = globalize.fetch(options[:locale] || Globalize.locale, name))
            value
          else
            super(name)
          end
        else
          super(name)
        end
      end

      def attribute_names
        translated_attribute_names.map(&:to_s) + super
      end

      delegate :translated?, :to => :class

      def translated_attributes
        translated_attribute_names.inject({}) do |attributes, name|
          attributes.merge(name.to_s => translation.send(name))
        end
      end

      # This method is basically the method built into Rails
      # but we have to pass {:translated => false}
      def untranslated_attributes
        attribute_names.inject({}) do |attrs, name|
          attrs[name] = read_attribute(name, {:translated => false}); attrs
        end
      end

      def set_translations(options)
        options.keys.each do |locale|
          translation = translation_for(locale) ||
                        translations.build(:locale => locale.to_s)

          options[locale].each do |key, value|
            translation.send :"#{key}=", value
          end
          translation.save
        end
        globalize.reset
      end

      def reload(options = nil)
        translation_caches.clear
        translated_attribute_names.each { |name| @attributes.delete(name.to_s) }
        globalize.reset
        super(options)
      end

      def clone
        obj = super
        return obj unless respond_to?(:translated_attribute_names)

        obj.instance_variable_set(:@translations, nil) if new_record? # Reset the collection because of rails bug: http://pastie.org/1521874
        obj.instance_variable_set(:@globalize, nil )
        each_locale_and_translated_attribute do |locale, name|
          obj.globalize.write(locale, name, globalize.fetch(locale, name) )
        end

        return obj
      end

      def translation
        translation_for(::Globalize.locale)
      end

      def translation_for(locale, build_if_missing = true)
        unless translation_caches[locale]
          # Fetch translations from database as those in the translation collection may be incomplete
          _translation = translations.detect{|t| t.locale.to_s == locale.to_s}
          _translation ||= translations.with_locale(locale).first unless translations.loaded?
          _translation ||= translations.build(:locale => locale) if build_if_missing
          translation_caches[locale] = _translation if _translation
        end
        translation_caches[locale]
      end

      def translation_caches
        @translation_caches ||= {}
      end

      def globalize_fallbacks(locale)
        Globalize.fallbacks(locale)
      end

      def rollback
        translation_caches[::Globalize.locale] = translation.previous_version
      end

      def save(*)
        return super if new_record? && read_attribute(:locale).blank?

        Globalize.with_locale(read_attribute(:locale) || I18n.default_locale) do
          super
        end
      end

    protected

      def each_locale_and_translated_attribute
        used_locales.each do |locale|
          translated_attribute_names.each do |name|
            yield locale, name
          end
        end
      end

      def used_locales
        locales = globalize.stash.keys.concat(globalize.stash.keys).concat(translations.translated_locales)
        locales.uniq!
        locales
      end

      def save_translations!
        globalize.save_translations!
        translation_caches.clear
      end

      def with_given_locale(attributes, &block)
        attributes.symbolize_keys! if attributes.respond_to?(:symbolize_keys!)

        locale = respond_to?(:locale=) ? attributes.try(:[], :locale) :
                                         attributes.try(:delete, :locale)

        if locale
          Globalize.with_locale(locale, &block)
        else
          yield
        end
      end
    end
  end
end
