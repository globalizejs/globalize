require File.dirname(__FILE__) + '/../spec_helper.rb'
require 'attribute_translation'

describe AttributeTranslation do
  include Spec::Matchers::HaveAttribute
  
  before do
    @translation = AttributeTranslation.new 'foo'
  end
  
  it "has the attributes :locale, :requested_locale" do
    @translation.should have_attr_accessors(:locale, :requested_locale)
  end

  it "has the method fallback?" do
    @translation.should_not be_a_fallback
  end
  
end
