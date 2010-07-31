require 'patches/active_record/xml_attribute_serializer'

module Globalize
  autoload :ActiveRecord, 'globalize/active_record'

  class << self
    def locale
      defined?(@@locale) && @@locale || I18n.locale
    end

    def locale=(locale)
      @@locale = locale
    end

    def with_locale(locale, &block)
      previous_locale = defined?(@@locale) && @@locale || nil
      self.locale = locale
      result = yield
      self.locale = previous_locale
      result
    end

    def fallbacks?
      I18n.respond_to?(:fallbacks)
    end

    def fallbacks(locale = self.locale)
      fallbacks? ? I18n.fallbacks[locale] : [locale.to_sym]
    end
  end
end

ActiveRecord::Base.extend(Globalize::ActiveRecord::ActMacro)
