# for specifications see http://en.wikipedia.org/wiki/IETF_language_tag
#
# SimpleParser does not implement advanced usages such as grandfathered tags

module Globalize
  module Locale
    module Rfc4646
      SUBTAGS = [:language, :script, :region, :variant, :extension, :privateuse, :grandfathered]
      FORMATS = {:language => :downcase, :script => :capitalize, :region => :upcase, :variant => :downcase}
    end
    
    class LanguageTag < Struct.new(*Rfc4646::SUBTAGS)
      class << self
        def parser
          @@parser ||= SimpleParser
        end
    
        def parser=(parser)
          @@parser = parser
        end
    
        def tag(tag)
          matches = parser.match(tag)
          new *matches if matches
        end
      end
  
      Rfc4646::FORMATS.each do |name, format|
        define_method(name) { self[name].send(format) unless self[name].nil? }
      end
      
      def to_sym
        to_s.to_sym
      end
      
      def to_s
        @tag ||= to_a.compact.join("-")
      end
  
      def to_a
        members.collect {|attr| self.send(attr) }
      end
  
      def parent
        segs = to_a.compact
        segs.length < 2 ? nil : LanguageTag.tag(segs[0..(segs.length-2)].join('-'))
      end
      
      def parents(include_self = true)
        result, parent = [], self.dup
        result << parent if include_self
        while parent = parent.parent
          result << parent
        end
        result
      end
  
      module SimpleParser
        PATTERN = %r{\A(?:
          ([a-z]{2,3}(?:(?:-[a-z]{3}){0,3})?|[a-z]{4}|[a-z]{5,8}) # language
          (?:-([a-z]{4}))?                                        # script
          (?:-([a-z]{2}|\d{3}))?                                  # region
          (?:-([0-9a-z]{5,8}|\d[0-9a-z]{3}))*                     # variant
          (?:-([0-9a-wyz](?:-[0-9a-z]{2,8})+))*                   # extension
          (?:-(x(?:-[0-9a-z]{1,8})+))?|                           # privateuse subtag
          (x(?:-[0-9a-z]{1,8})+)|                                 # privateuse tag
          /* ([a-z]{1,3}(?:-[0-9a-z]{2,8}){1,2}) */               # grandfathered
          )\z}xi 

        class << self
          def match(tag)
            c = PATTERN.match(tag.to_s).captures
            c[0..4] << (c[5].nil? ? c[6] : c[5])  << c[7] # TODO c[7] is grandfathered, throw a NotImplemented exception here?
          rescue
            false
          end
        end
      end
    end
  end
end
