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
      def initialize(*defaults)
        @map = {}
        map defaults.pop if defaults.last.is_a?(Hash)
        
        defaults = [I18n.default_locale.to_sym] if defaults.empty?
        self.defaults = defaults 
      end
      
      def defaults=(defaults)
        @defaults = defaults.map{|default| compute(default, false) }.flatten << :root
      end
      attr_reader :defaults
      
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
    
      def compute(tags, include_defaults = true)
        result = Array(tags).collect do |tag|
          tags = LanguageTag::tag(tag.to_sym).parents(true).map! {|t| t.to_sym }
          tags.each{|tag| tags += compute(@map[tag]) if @map[tag] }
          tags
        end.flatten
        result.push *defaults if include_defaults
        result.uniq
      end
    end
  end
end
