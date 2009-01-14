require File.join( File.dirname(__FILE__), 'test_helper' )
require 'globalize/translation'

class TranslationTest < ActiveSupport::TestCase
  include Globalize
   
  def setup
    @translation = Translation::Static.new 'foo', :locale => :'en-US'
  end

  test "responds to fallback?" do
    assert @translation.respond_to?( :fallback? )
  end

  test "returns true when :locale and :requested_locale are not equal" do
    @translation.requested_locale = :'de-DE'
    assert @translation.fallback?
  end
  
  test "returns false when :locale and :requested_locale are equal" do
    @translation.requested_locale = :'en-US'
    assert !@translation.fallback?
  end
    
  test "has the attribute :locale" do
    assert @translation.respond_to?( :locale )
  end
  
  test "has the attribute :requested_locale" do
    assert @translation.respond_to?( :requested_locale )
  end
  
  test "has the attribute :options" do
    assert @translation.respond_to?( :options )
  end
  
  test "has the attribute :plural_key" do
    assert @translation.respond_to?( :plural_key )
  end
  
  test "has the attribute :original" do
    assert @translation.respond_to?( :original )    
  end
  
  test "Translation::Attribute has the attribute :locale" do
    translation = Translation::Attribute.new 'foo'
    assert translation.respond_to?( :locale )
  end
  
  test "Translation::Attribute has the attribute :requested_locale" do
    translation = Translation::Attribute.new 'foo'
    assert translation.respond_to?( :requested_locale )
  end
end
