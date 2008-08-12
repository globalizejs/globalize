# ViewTranslations are simple valueobjects that carry some context information
# alongside the actual translation string.

class ViewTranslation < String
  # the Locale which this translation belongs to
  attr_accessor :locale
  
  # the key that was used to lookup this translation
  attr_accessor :key
  
  # the options that were passed when looking up this translation
  attr_accessor :options
  
  # the originally requested Locale (might be different from locale in case of fallbacks)
  attr_accessor :requested_locale
  
  # the grammatical number that this translation has
  attr_accessor :grammatical_number
  
  # the original translation string before any variables were interpolated to it
  attr_accessor :original
  
  def initialize(translation, locale = nil, key = nil, options = nil, requested_locale = nil, grammatical_number = nil)
    @locale             = locale
    @key                = key
    @options            = options
    @requested_locale   = requested_locale
    @grammatical_number = grammatical_number
    @original           = translation
    super translation
  end
  
  def fallback?
  end  
end