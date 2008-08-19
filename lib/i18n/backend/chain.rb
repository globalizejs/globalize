module I18n
  module Backend
    class Chain
      def add(backend)
        backends << backend
      end
    
      def translate(locale, key, options = {})
        backends.each do |backend|
          result = backend.translate(locale, key, options) and return result
        end
      end
    
      protected
        def backends
          @backends ||= []
        end
    end
  end
end