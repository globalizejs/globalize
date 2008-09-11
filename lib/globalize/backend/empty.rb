module Globalize
  module Backend
    class Empty
      def load_translations(*filenames)
      end
      
      def store_translations(locale, data)
      end
      
      def translate(locale, key, options = {})
      end
      
      def localize(locale, object, format = :default)
      end      
    end
  end
end
