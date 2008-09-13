module Globalize
  # ViewTranslations are simple valueobjects that carry some context information
  # alongside the actual translation string.

  class ViewTranslation < String
    def attributes
      @attributes ||= {}
    end
    
    def set_attributes(attributes)
      attributes.each do |name, value|
        raise "unknown attribute #{name}" unless ATTR_READERS.include?(name)
        self.attributes[name] = value 
      end
    end
  
    def fallback?
      @locale != @requested_locale
    end
    
    ATTR_READERS = [:requested_locale, :locale, :key, :options, :plural_key, :original]
    ATTR_WRITERS = [:requested_locale=, :locale=, :key=, :options=, :plural_key=, :original=]
    
    def method_missing(name, *args)
      return attributes[name] if ATTR_READERS.include?(name)
      return attributes[name] = args.first if ATTR_WRITERS.include?(name)
      super
    end
  end
end