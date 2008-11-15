require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/backend/static'
require 'globalize/translation'

describe Globalize::Backend::Static, '#translate' do
  before :each do
    I18n.backend = Globalize::Backend::Static.new
    translations = {:"en-US" => {:foo => "foo in en-US", :boz => 'boz', :buz => {:bum => 'bum'}},
                    :"en"    => {:bar => "bar in en"},
                    :"de-DE" => {:baz => "baz in de-DE"},
                    :"de"    => {:boo => "boo in de"}}
    translations.each do |locale, data| 
      I18n.backend.store_translations locale, data 
    end
    I18n.fallbacks.map :"de-DE" => :"en-US", :he => :en
  end
  
  describe "when passed a single key for a translation" do
    it "returns an instance of Translation:Static" do
      translation = I18n.translate :foo
      translation.should be_instance_of(Globalize::Translation::Static)
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
  
    describe "requesting he" do
      it "returns the translation in en if none in he is present" do
        I18n.translate(:bar, :locale => :he).should == "bar in en"
      end
    end
  
    describe "using defaults" do
      it "returns the given default String when the key is not present for any locale" do
        I18n.translate(:missing, :default => "default").should == "default"
      end

      it "returns the fallback translation for the key if present for a fallback locale" do
        I18n.backend.store_translations :de, :non_default => "non_default in de"
        I18n.translate(:non_default, :default => "default", :locale => :"de-DE").should == "non_default in de"
      end
    end
  end
  
  describe "when looking up an array of translations (bulk lookup)" do
    it "returns an array of translations" do
      I18n.translate([:foo, :boz]).should be_instance_of(Array)
    end
    
    it "returns an array of instances of Translation::Static" do
      I18n.translate([:foo, :boz]).map(&:class).uniq.should == [Globalize::Translation::Static]
    end
  end
  
  describe "when looking up a namespace" do
    it "returns a hash of translations" do
      I18n.translate(:"buz").should be_instance_of(Hash)
    end
    
    it "returns an array of translations" do
      I18n.translate(:"buz").values.map(&:class).should == [Globalize::Translation::Static]
    end
  end
end

describe 'the Translation object returned by Globalize::Backend::Static#translate' do
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