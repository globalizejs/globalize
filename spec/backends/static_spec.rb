require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/backend/static'

describe Globalize::Backend::Static, '#translate' do
  before :each do
    I18n.backend = Globalize::Backend::Static.new
    translations = {:"en-US" => {:foo => "foo in en-US"},
                    :"en"    => {:bar => "bar in en"},
                    :"de-DE" => {:baz => "baz in de-DE"},
                    :"de"    => {:boo => "boo in de"}}
    translations.each do |locale, data| 
      I18n.backend.store_translations locale, data 
    end
    I18n.fallbacks.map :"de-DE" => :"en-US"
  end
  
  describe "requesting en-US" do
    it "returns the translation in en-US if present" do
      I18n.translate(:foo, :locale => :"en-US").should == "foo in en-US"
    end
  
    it "returns the translation in en if en-US is not present" do
      I18n.translate(:bar, :locale => :"en-US").should == "bar in en"
    end
  end
  
  describe "requesting de-DE" do
    it "returns the translation in de-DE if present" do
      I18n.translate(:baz, :locale => :"de-DE").should == "baz in de-DE"
    end
      
    it "returns the translation in de if de-DE is not present" do
      I18n.translate(:boo, :locale => :"de-DE").should == "boo in de"
    end
      
    it "returns the translation in en-US if none of de-DE and de are present" do
      I18n.translate(:foo, :locale => :"de-DE").should == "foo in en-US"
    end
  
    it "returns the translation in en if none of de-DE, de and en-US are present" do
      I18n.translate(:bar, :locale => :"de-DE").should == "bar in en"
    end
  end
end

describe 'the ViewTranslation returned by Globalize::Backend::Static#translate' do
  before :each do
    I18n.backend = Globalize::Backend::Static.new 
    translations = {
      :greeting => "Hi {{name}}",
      :messages => { :one => "You have one message.", :other => "You have {{count}} messages."}
    }
    I18n.backend.store_translations :"en", translations
  end
  
  def greeting
    I18n.translate :greeting, :locale => :"en-US", :name => "Joshua"
  end
  
  it "stores the actual locale" do
    greeting.locale.should == :en
  end
  
  it "stores the requested locale" do
    greeting.requested_locale.should == :"en-US"
  end
  
  it "stores the requested key" do
    greeting.key.should == :greeting
  end
  
  it "stores the options given to #translate" do
    greeting.options.should == {:name => "Joshua"}
  end
  
  it "stores the original translation before it was interpolated" do
    greeting.original.should == "Hi {{name}}"
  end
  
  it "stores the plural_key :one if pluralized as such" do
    message = I18n.translate :messages, :locale => :"en-US", :count => 1
    message.plural_key.should == :one
  end
  
  it "stores the plural_key :other if pluralized as such" do
    messages = I18n.translate :messages, :locale => :"en-US", :count => 2
    messages.plural_key.should == :other
  end
end