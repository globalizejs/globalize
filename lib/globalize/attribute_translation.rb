module Globalize
  # AtributeTranslation is an expansion of String, which adds some relevant
  # metadata about the translated model attribute.
  class AttributeTranslation < String
  
    # The +Locale+ to which this translation actually belongs.
    attr_reader :locale
  
    # The originally requested Locale (might be different from +locale+ in case of fallbacks).
    attr_reader :requested_locale
  
    # True, if the requested locale wasn't available and a fallback was used instead.
    def fallback?; @fallback end
    
    def initialize(str, rec)
      super str
      @locale = rec[:locale]
      @requested_locale = rec[:requested_locale]
      @fallback = rec[:fallback]
    end
  end
end
