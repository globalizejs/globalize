module Globalize
  module Model
    # AtributeTranslation is an expansion of String, which adds some relevant
    # metadata about the translated model attribute.
    class AttributeTranslation < String
  
      # The +Locale+ to which this translation actually belongs.
      attr_reader :locale
  
      # The originally requested Locale (might be different from +locale+ in case of fallbacks).
      attr_reader :requested_locale
  
      # True, if the requested locale wasn't available and a fallback was used instead.
      def fallback?; locale != requested_locale end
    
      def initialize(str, options)
        super str
        @locale = options[:locale].to_sym if options[:locale]
        @requested_locale = options[:requested_locale].to_sym if options[:requested_locale]
      end
    end
  end
end
