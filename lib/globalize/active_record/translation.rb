module Globalize
  module ActiveRecord
    class Translation < ::ActiveRecord::Base
      class << self
        def with_locales(*locales)
          where(:locale => locales.flatten.map(&:to_s))
        end
        alias with_locale with_locales

        def available_locales
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