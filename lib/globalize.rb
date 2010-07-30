require 'patches/active_record/xml_attribute_serializer'

module Globalize
  autoload :ActiveRecord, 'globalize/active_record'

  class << self
    def fallbacks?
      I18n.respond_to?(:fallbacks)
    end

    def fallbacks(locale)
      fallbacks? ? I18n.fallbacks[locale] : [locale.to_sym]
    end
  end
end

ActiveRecord::Base.extend(Globalize::ActiveRecord::ActMacro)
