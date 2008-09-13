require 'globalize/locale/language_tag'

module I18n
  @@fallbacks = nil
    
  class << self
    # Returns the current fallbacks. Defaults to +Globalize::Locale::Fallbacks+.
    def fallbacks
      @@fallbacks ||= Globalize::Locale::Fallbacks.new
    end
    
    # Sets the current fallbacks. Used to set a custom fallbacks instance.
    def fallbacks=(fallbacks) 
      @@fallbacks = fallbacks
    end
  end
end

module Globalize
  module Locale
    class Fallbacks < Hash
      def initialize(*args)
        @map = {}
        map args.pop if args.last.is_a?(Hash)
        @root = args.shift
      end
      
      def root
        @root || I18n.default_locale.to_sym # TODO default_locale should always be a Symbol
      end
      
      def [](tag)
        tag = tag.to_sym
        has_key?(tag) ? fetch(tag) : store(tag, compute(tag))
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
      
      protected
    
      def compute(tags, include_root = true)
        result = Array(tags).collect do |tag|
          tags = LanguageTag::tag(tag.to_sym).parents(true).map! {|t| t.to_sym }
          tags.each{|tag| tags += compute(@map[tag]) if @map[tag] }
          tags
        end.flatten
        
        result << root if root and include_root
        result.uniq
      end
    end
  end
end
