require File.dirname(__FILE__) + '/spec/helper.rb'
require 'globalize/translation'

include Globalize

describe Translation do
  before :each do
    @translation = Translation::Static.new 'foo', :locale => :'en-US'
  end

  it "responds to fallback?" do
    @translation.respond_to? :fallback?
  end

  describe "fallback?" do
    it "returns true when :locale and :requested_locale are not equal" do
      @translation.requested_locale = :'de-DE'
      @translation.fallback?.should be_true
    end
    
    it "returns false when :locale and :requested_locale are equal" do
      @translation.requested_locale = :'en-US'
      @translation.fallback?.should be_false
    end
  end
end

describe Translation::Static do
  include Spec::Matchers::HaveAttribute
  
  before :each do
    @translation = Translation::Static.new 'foo'
  end
  
  it "has the attribute :locale, :key, :options, :requested_locale, :plural_key, :original" do
    @translation.should have_attr_accessor(:locale)
  end
  
  it "has the attribute :locale" do
    @translation.should have_attr_accessor(:locale)
  end
  
  it "has the attribute :requested_locale" do
    @translation.should have_attr_accessor(:requested_locale)
  end
  
  it "has the attribute :options" do
    @translation.should have_attr_accessor(:options)
  end
  
  it "has the attribute :plural_key" do
    @translation.should have_attr_accessor(:plural_key)
  end
  
  it "has the attribute :original" do
    @translation.should have_attr_accessor(:original)
  end
end

describe Translation::Attribute do
  include Spec::Matchers::HaveAttribute
  
  before :each do
    @translation = Translation::Attribute.new 'foo'
  end
  
  it "has the attribute :locale, :key, :options, :requested_locale, :plural_key, :original" do
    @translation.should have_attr_accessor(:locale)
  end
  
  it "has the attribute :locale" do
    @translation.should have_attr_accessor(:locale)
  end
  
  it "has the attribute :requested_locale" do
    @translation.should have_attr_accessor(:requested_locale)
  end
end