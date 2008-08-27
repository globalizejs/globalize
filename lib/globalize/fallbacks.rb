module Globalize
  class Fallbacks
    def initialize
      @map = {}
    end
    
    # TODO make this code handle real cases
    def compute(tag)
      tag = Rfc4646::tag(tag) if String === tag
      [ tag, tag.parent ].compact + (@map[tag] || [])
    end
    
    def add(from, to)
      from = Rfc4646::tag(from) if String === from
      to   = Rfc4646::tag(to)   if String === to
      @map[from] ||= []
      @map[from] << to
    end
  end
end
