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

ActiveRecord::Base.send(:include, Globalize::ActiveRecord)
