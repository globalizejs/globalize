module Globalize
  # Translations are simple value objects that carry some context information
  # alongside the actual translation string.

  class Translation < String
    class Attribute < Translation
      attr_accessor :requested_locale, :locale, :key
    end
    
    class Static < Translation
      attr_accessor :requested_locale, :locale, :key, :options, :plural_key, :original
      
      def initialize(string, meta = nil)
        self.original = string
        super
      end
    end
    
    def initialize(string, meta = nil)
      set_meta meta
      super string
    end
  
    def fallback?
      locale.to_sym != requested_locale.to_sym
    end
    
    def set_meta(meta)
      meta.each {|name, value| send :"#{name}=", value } if meta
    end
  end
end