require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/model/attribute_translation'

include Globalize::Model

describe AttributeTranslation do
  include Spec::Matchers::HaveAttribute
  
  before do
    @translation = AttributeTranslation.new 'foo', :locale => 'en-US', 
      :requested_locale => 'de-DE'
  end
  
  it "has the attributes :locale, :requested_locale" do
    @translation.locale.should == :'en-US'
    @translation.requested_locale.should == :'de-DE'
  end

  it "responds to fallback?" do
    @translation.respond_to? :fallback?
  end

  describe "fallback?" do
    it "returns true when :locale and :requested_locale are not equal" do
      @translation.fallback?.should be_true
    end
    
    it "returns false when :locale and :requested_locale are equal" do
      @translation.instance_variable_set(:@requested_locale, :'en-US')
      @translation.fallback?.should be_false
    end
  end
  
end
