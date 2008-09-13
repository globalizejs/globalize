module Globalize
  # ViewTranslations are simple valueobjects that carry some context information
  # alongside the actual translation string.

  class ViewTranslation < String
    ATTRS = [:requested_locale, :locale, :key, :options, :plural_key, :original]
    ATTRS.each do |name|
      define_method(name){ attributes[name] }
      define_method("#{name}="){ |value| attributes[name] = value}
    end
    
    def attributes
      @attributes ||= {}
    end
    
    def set_attributes(attributes)
      attributes.each do |name, value|
        raise "unknown attribute #{name}" unless ATTRS.include?(name)
        self.attributes[name] = value 
      end
    end
  
    def fallback?
      @locale != @requested_locale
    end
  end
end