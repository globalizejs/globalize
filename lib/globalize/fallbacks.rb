require 'rfc4646'

module Globalize
  class Fallbacks
    def initialize
      @map = Hash.new
    end
    
    # TODO make this code handle real cases
    def compute(tag)
      rfc_tag = Rfc4646::tag(tag)
      [ rfc_tag, rfc_tag.parent ].compact.map {|rt| rt.to_s } + (@map[tag] || [])
    end
    
    def add(from, to)
      @map[from] ||= []
      @map[from] << to
    end
  end
end
