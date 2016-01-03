require 'request_store'
require 'active_record'
require 'patches/active_record/xml_attribute_serializer'
require 'patches/active_record/query_method'
require 'patches/active_record/serialization'
require 'patches/active_record/uniqueness_validator'
require 'patches/active_record/persistence'

module Globalize
  autoload :ActiveRecord, 'globalize/active_record'
  autoload :Interpolation,   'globalize/interpolation'

  class << self
    def locale
      read_locale || I18n.locale
    end

    def locale=(locale)
      set_locale(locale)
    end

    def with_locale(locale, &block)
      previous_locale = read_locale
      begin
        set_locale(locale)
        result = yield(locale)
      ensure
        set_locale(previous_locale)
      end
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

    # Thread-safe global storage
    def storage
      RequestStore.store
    end

  protected

    def read_locale
      storage[:globalize_locale]
    end

    def set_locale(locale)
      storage[:globalize_locale] = locale.try(:to_sym)
    end

    def read_fallbacks
      storage[:globalize_fallbacks] || HashWithIndifferentAccess.new
    end

    def set_fallbacks(locales)
      fallback_hash = HashWithIndifferentAccess.new

      locales.each do |key, value|
        fallback_hash[key] = value.presence || [key]
      end if locales.present?

      storage[:globalize_fallbacks] = fallback_hash
    end
  end
end

ActiveRecord::Base.mattr_accessor :globalize_serialized_attributes, instance_writer: false
ActiveRecord::Base.globalize_serialized_attributes = {}

ActiveRecord::Base.extend(Globalize::ActiveRecord::ActMacro)
