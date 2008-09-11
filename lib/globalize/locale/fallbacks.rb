require 'globalize/locale/language_tag'

module Globalize
  module Locale
    class Fallbacks
      def initialize(rules = nil)
        @map = rules || Hash.new
      end
    
      # TODO make this code handle real cases
      def compute(tag)
        rfc_tag = LanguageTag::tag(tag)
        [ rfc_tag, rfc_tag.parent ].compact.map {|rt| rt.to_s } + (@map[tag] || [])
      end
    
      def add(from, to)
        @map[from] ||= []
        @map[from] << to
      end
    end
  end
end
