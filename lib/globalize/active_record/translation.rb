module Globalize
  module ActiveRecord
    class Translation < ::ActiveRecord::Base
      class << self
        def with_locales(*locales)
          # Avoid using "IN" with SQL queries when only using one locale.
          locales = locales.flatten.map(&:to_s)
          locales = locales.first if locales.one?
          where(:locale => locales)
        end
        alias with_locale with_locales

        def translated_locales
          select('DISTINCT locale').map(&:locale)
        end
      end

      def locale
        read_attribute(:locale).to_sym
      end

      def locale=(locale)
        write_attribute(:locale, locale.to_s)
      end
    end
  end
end