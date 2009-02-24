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
        result ||= default locale, default, options

        attrs = {:requested_locale => locale, :locale => fallback, :key => key, :options => options}
        translation(result, attrs) || raise(I18n::MissingTranslationData.new(locale, key, options))
      end

      protected

        alias :orig_interpolate :interpolate unless method_defined? :orig_interpolate
        def interpolate(locale, string, values = {})
          result = orig_interpolate(locale, string, values)
          translation = translation(string)
          translation.nil? ? result : translation.replace(result)
        end

        def translation(result, meta = nil)
          return unless result

          case result
          when Numeric
            result
          when String
            result = Translation::Static.new(result) unless result.is_a? Translation::Static
            result.set_meta meta
            result
          when Hash
            Hash[*result.map do |key, value|
              [key, translation(value, meta)]
            end.flatten]
          when Array
            result.map do |value|
              translation(value, meta)
            end
          else
            result
            # raise "unexpected translation type: #{result.inspect}"
          end
        end
    end
  end
end