require 'rfc4646'

class Locale
  attr_reader :tag
  
  def initialize(str)
    @tag = Rfc4646.tag(str)
  end
  
  def method_missing(name, *args)
    return @tag.send(name, *args) if @tag.respond_to? name      
    super
  end
end