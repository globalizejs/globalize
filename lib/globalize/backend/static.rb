require 'globalize/backend/pluralizing'
require 'globalize/locale/fallbacks'
require 'globalize/translation'

module Globalize  
  module Backend
    class Static < Pluralizing
      def initialize(*args)
        add(*args) unless args.empty?
      end
      
      def translate(locale, key, options = {})
        result, default, fallback = nil, options.delete(:default), nil
        I18n.fallbacks[locale].each do |fallback|
          begin
            result = super(fallback, key, options) and break
          rescue I18n::MissingTranslationData
          end
        end
        
        attributes = { :requested_locale => locale, :locale => fallback, :key => key, :options => options }
        result = translation(result, attributes) if result
        
        result || default(locale, default, options) || raise(I18n::MissingTranslationData.new(locale, key, options))
      end
      
      protected
      
        alias :orig_interpolate :interpolate unless method_defined? :orig_interpolate
        def interpolate(locale, string, values = {})
          result = orig_interpolate(locale, string, values)
          translation result, merge_attributes(string, :original => string)
        end
      
        def translation(result, attributes = {})
          result = Translation.new(result) unless result.is_a? Translation
          result.set_attributes attributes
          result
        end
        
        def merge_attributes(translation, attributes)
          result = translation.respond_to?(:attributes) ? translation.attributes : {}
          result.merge attributes
        end
    end
  end
end