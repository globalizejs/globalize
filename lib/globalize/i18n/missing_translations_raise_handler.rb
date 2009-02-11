# A simple exception handler that behaves like the default exception handler
# but also raises on missing translations.
#
# Useful for identifying missing translations during testing.
# 
# E.g. 
#
#   require 'globalize/i18n/missing_translations_raise_handler
#   I18n.exception_handler = :missing_translations_raise_handler
module I18n
  class << self
    def missing_translations_raise_handler(exception, locale, key, options)
      raise exception
    end
  end
  
#  self.exception_handler = :missing_translations_raise_handler
end

I18n.exception_handler = :missing_translations_raise_handler

ActionView::Helpers::TranslationHelper.module_eval do
  def translate(key, options = {})
    I18n.translate(key, options)
  end
  alias :t :translate
end
