module Globalize
  # Translations are simple valueobjects that carry some context information
  # alongside the actual translation string.

  class Translation < String
    ATTRS = [:requested_locale, :locale, :key, :options, :plural_key, :original]
    ATTRS.each do |name|
      define_method(name){ attributes[name] }
      define_method("#{name}="){ |value| attributes[name] = value}
    end
    
    def initialize(string, attributes = {})
      set_attributes attributes
      super string
    end
    
    def attributes
      @attributes ||= {}
    end
    
    def set_attributes(attributes)
      attributes.each do |name, value|
        raise "unknown attribute #{name}" unless ATTRS.include?(name)
        value = value.to_sym if [:requested_locale, :locale, :key, :plural_key].include?(name)
        self.attributes[name] = value 
      end
    end
  
    def fallback?
      locale != requested_locale
    end
  end
end