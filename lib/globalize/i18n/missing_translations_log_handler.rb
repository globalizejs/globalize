# A simple exception handler that behaves like the default exception handler
# but additionally logs missing translations to a given log.
#
# Useful for identifying missing translations during testing.
# 
# E.g. 
#
#   require 'globalize/i18n/missing_translations_log_handler
#   I18n.missing_translations_logger = RAILS_DEFAULT_LOGGER
#   I18n.exception_handler = :missing_translations_log_handler
#
# To set up a different log file:
#
#   logger = Logger.new("#{RAILS_ROOT}/log/missing_translations.log")
#   I18n.missing_translations_logger = logger

module I18n
  @@missing_translations_logger = nil
  
  class << self
    def missing_translations_logger
      @@missing_translations_logger ||= begin
        require 'logger' unless defined?(Logger)
        Logger.new(STDOUT)
      end
    end
  
    def missing_translations_logger=(logger)
      @@missing_translations_logger = logger
    end
  
    def missing_translations_log_handler(exception, locale, key, options)
      if MissingTranslationData === exception
        missing_translations_logger.warn(exception.message)
        return exception.message 
      else
        raise exception
      end
    end
  end
end