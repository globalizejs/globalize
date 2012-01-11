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
        # Maintain Rails 3.0.x compatibility while adding Rails 3.1.x compatibility
        if base.method_defined?(:assign_attributes)
          base.class_eval %{
            def assign_attributes(attributes, options = {})
              with_given_locale(attributes) { super }
            end
          }
        else
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
      end

      def write_attribute(name, value, options = {})
        # raise 'y' if value.nil? # TODO.

        if translated?(name)
          # Deprecate old use of locale
          unless options.is_a?(Hash)
            warn "[DEPRECATION] passing 'locale' as #{options.inspect} is deprecated. Please use {:locale => #{options.inspect}} instead."
            options = {:locale => options}
          end
          options = {:locale => nil}.merge(options)
          attribute_will_change! name.to_s
          the_locale = options[:locale] || Globalize.locale
          self.translations.reject!{|t| t.new_record? && t.locale != the_locale}
          globalize.write(the_locale, name, value)
        else
          super(name, value)
        end
      end

      def read_attribute(name, options = {})
        # Deprecate old use of locale
        unless options.is_a?(Hash)
          warn "[DEPRECATION] passing 'locale' as #{options.inspect} is deprecated. Please use {:locale => #{options.inspect}} instead."
          options = {:locale => options}
        end

        options = {:translated => true, :locale => nil}.merge(options)
        if self.class.translated?(name) and options[:translated]
          globalize.fetch(options[:locale] || Globalize.locale, name)
        else
          super(name)
        end
      end

      def attribute_names
        translated_attribute_names.map(&:to_s) + super
      end

      def translated?(name)
        self.class.translated?(name)
      end

      def translated_attributes
        translated_attribute_names.inject({}) do |attributes, name|
          attributes.merge(name.to_s => translation.send(name))
        end
      end

      # This method is basically the method built into Rails
      # but we have to pass {:translated => false}
      def untranslated_attributes
        attrs = {}
        attribute_names.each do |name|
          attrs[name] = read_attribute(name, {:translated => false})
        end
        attrs
      end

      def set_translations(options)
        options.keys.each do |locale|
          translation = translation_for(locale) ||
            translations.build(:locale => locale.to_s)
          translation.update_attributes!(options[locale])
        end
      end

      def reload(options = nil)
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

      def translation_for(locale)
        @translation_caches ||= {}
        unless @translation_caches[locale]
          # Fetch translations from database as those in the translation collection may be incomplete
          _translation = translations.detect{|t| t.locale.to_s == locale.to_s}
          _translation ||= translations.with_locale(locale).first
          _translation ||= translations.build(:locale => locale)
          @translation_caches[locale] = _translation
        end
        @translation_caches[locale]
      end

      def rollback
        @translation_caches[::Globalize.locale] = translation.previous_version
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
        @translation_caches = {}
      end

      def with_given_locale(attributes, &block)
        attributes.symbolize_keys! if attributes.respond_to?(:symbolize_keys!)
        if locale = attributes.try(:delete, :locale)
          Globalize.with_locale(locale, &block)
        else
          yield
        end
      end
    end
  end
end
