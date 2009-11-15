# Helper class for storing values per locale. Used by Globalize::Adapter
# to stash and cache attribute values.
module Globalize
  module ActiveRecord
    class Attributes < Hash
      def [](locale)
        locale = locale.to_sym
        self[locale] = {} unless has_key?(locale)
        self.fetch(locale)
      end

      def contains?(locale, attr_name)
        self[locale].has_key?(attr_name)
      end

      def read(locale, attr_name)
        self[locale][attr_name]
      end

      def write(locale, attr_name, value)
        self[locale][attr_name] = value
      end
    end
  end
end
