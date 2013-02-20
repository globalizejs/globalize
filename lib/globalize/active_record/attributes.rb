# Helper class for storing values per locale. Used by Globalize::Adapter
# to stash and cache attribute values.

module Globalize
  module ActiveRecord
    class Attributes < Hash # TODO: Think about using HashWithIndifferentAccess ?
      def [](locale)
        locale = locale.to_sym
        self[locale] = {} unless has_key?(locale)
        self.fetch(locale)
      end

      def contains?(locale, name)
        self[locale].has_key?(name.to_s)
      end

      def read(locale, name)
        self[locale][name.to_s]
      end

      def write(locale, name, value)
        self[locale][name.to_s] = value
      end
    end
  end
end
