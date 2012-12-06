require 'active_record'
require 'patches/active_record/xml_attribute_serializer'
require 'patches/active_record/query_method'
require 'patches/active_record/uniqueness_validator'

module Globalize
  autoload :ActiveRecord, 'globalize/active_record'
  autoload :Versioning,   'globalize/versioning'

  class << self
    def locale
      read_locale || I18n.locale
    end

    def locale=(locale)
      set_locale(locale)
    end

    def with_locale(locale, &block)
      previous_locale = read_locale
      set_locale(locale)
      result = yield(locale)
      set_locale(previous_locale)
      result
    end

    def with_locales(*locales, &block)
      locales.flatten.map do |locale|
        with_locale(locale, &block)
      end
    end

    def fallbacks=(locales)
      set_fallbacks(locales)
    end

    def i18n_fallbacks?
      I18n.respond_to?(:fallbacks)
    end

    def fallbacks(for_locale = self.locale)
      read_fallbacks[for_locale] || default_fallbacks(for_locale)
    end

    def default_fallbacks(for_locale = self.locale)
      i18n_fallbacks? ? I18n.fallbacks[for_locale] : [for_locale.to_sym]
    end

  protected

    def read_locale
      Thread.current[:globalize_locale]
    end

    def set_locale(locale)
      Thread.current[:globalize_locale] = locale.try(:to_sym)
    end

    def read_fallbacks
      hash = HashWithIndifferentAccess.new

      if (fb = Thread.current[:fallbacks]).present?
        fb.each do |key, value|
          hash[key] = value.presence || [key]
        end
      end

      hash
    end

    def set_fallbacks(locales = {})
      Thread.current[:fallbacks] = locales
    end
  end
end

ActiveRecord::Base.extend(Globalize::ActiveRecord::ActMacro)
