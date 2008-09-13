require 'globalize/locale/language_tag'

module Globalize
  module Locale
    class Fallbacks < Hash
      def initialize(*args)
        @map = {}
        map args.pop if args.last.is_a?(Hash)
        @root = args.shift
      end
      
      def [](tag)
        tag = tag.to_sym
        has_key?(tag) ? fetch(tag) : store(tag, compute(tag))
      end
    
      def compute(tags, include_root = true)
        return [@root] if tags == @root
        
        result = Array(tags).collect do |tag|
          tags = LanguageTag::tag(tag.to_sym).parents(true).map! {|t| t.to_sym }
          tags.each{|tag| tags += compute(@map[tag]) if @map[tag] }
          tags
        end.flatten
        
        result << @root if @root and include_root
        result.uniq
      end
    
      def map(mappings)
        mappings.each do |from, to|
          from, to = from.to_sym, Array(to)
          to.each do |to|
            @map[from] ||= []
            @map[from] << to.to_sym
          end
        end
      end
    end
  end
end
