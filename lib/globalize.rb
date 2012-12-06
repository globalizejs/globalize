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

    def fallbacks(locale = self.locale)
      if read_fallbacks.blank?
        i18n_fallbacks? ? I18n.fallbacks[locale] : [locale.to_sym]
      else
        if read_fallbacks.is_a? Array
          read_fallbacks
        elsif read_fallbacks.is_a? Hash
          read_fallbacks.each do |key, value|
            return value if locale.to_sym.eql? key.to_sym
          end
          i18n_fallbacks? ? I18n.fallbacks[locale] : [locale.to_sym]
        else
          [read_fallbacks]
        end
      end
    end

  protected

    def read_locale
      Thread.current[:globalize_locale]
    end

    def set_locale(locale)
      Thread.current[:globalize_locale] = locale.to_sym rescue nil
    end

    def read_fallbacks
      Thread.current[:fallbacks]
    end

    def set_fallbacks(locales)
      Thread.current[:fallbacks] = locales rescue nil
    end
  end
end

ActiveRecord::Base.extend(Globalize::ActiveRecord::ActMacro)
