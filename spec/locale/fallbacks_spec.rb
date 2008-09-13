require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/locale/fallbacks'
require 'globalize/locale/language_tag'

include Globalize::Locale

describe Fallbacks do
  before do
    I18n.fallbacks = Fallbacks.new
  end
  
  after do
    I18n.default_locale = :'en-US'
  end
  
  it "#[] caches computed results" do
    I18n.fallbacks['en']
    I18n.fallbacks.should == { :en => [:en, :"en-US"] }
  end
  
  it "#root always reflects the I18n.default_locale if no root has been set manually" do
    I18n.default_locale = :'en-US'
    I18n.fallbacks.root.should == I18n.default_locale
    I18n.default_locale = :'de-DE'
    I18n.fallbacks.root.should == I18n.default_locale
  end
  
  it "#root always reflects the manually set locale if present" do
    I18n.fallbacks = Fallbacks.new(:'fi-FI')
    I18n.fallbacks.root.should == :'fi-FI'
    I18n.default_locale = :'de-DE'
    I18n.fallbacks.root.should == :'fi-FI'
  end
end

describe Fallbacks, "#compute with root set to en-US" do
  before do
    @fallbacks = Fallbacks.new(:'en-US')
  end
  
  describe "with no mappings defined" do
    it "returns [:es, :en-US] for :es" do
      @fallbacks[:es].should == [:es, :"en-US"]
    end
  
    it "returns [:es-ES, :es, :en-US] for :es-ES" do
      @fallbacks[:"es-ES"].should == [:"es-ES", :es, :"en-US"]
    end
    
    it "returns [:es-MX, :es, :en-US] for :es-MX" do
      @fallbacks[:"es-MX"].should == [:"es-MX", :es, :"en-US"]
    end
    
    it "returns [:es-Latn-ES, :es-Latn, :es, :en-US] for :es-Latn-ES" do
      @fallbacks[:'es-Latn-ES'].should == [:"es-Latn-ES", :"es-Latn", :es, :"en-US"]
    end
    it "returns [:en, :en-US] for :en" do
      @fallbacks[:en].should == [:en, :"en-US"]
    end
      
    it "returns [:en-US, :en] for :en-US (special case: locale == root)" do 
      @fallbacks[:"en-US"].should == [:"en-US", :en]
    end
  end
  
  # Most people who speak Catalan also live in Spain, so it is safe to assume
  # that they also speak Spanish as spoken in Spain.
  describe "with a mapping :ca => es-ES defined" do
    before :each do
      @fallbacks.map :ca => :"es-ES"
    end
    
    it "returns [:ca, :es-ES, :es, :en-US] for :ca" do
      @fallbacks[:ca].should == [:ca, :"es-ES", :es, :"en-US"]
    end
    
    it "returns [:ca-ES, :ca, :es-ES, :es, :en-US] for :ca-ES" do
      @fallbacks[:"ca-ES"].should == [:"ca-ES", :ca, :"es-ES", :es, :"en-US"]
    end
  end
  
  # People who speak Arabic as spoken in Palestine often times also speak
  # Hebrew as spoken in Israel. However it is in no way safe to assume that 
  # everybody who speaks Arabic also speaks Hebrew.
  describe "with a mapping :ar-PA => he-IL defined" do
    before :each do
      @fallbacks.map :"ar-PA" => :"he-IL"
    end
    
    it "returns [:ar, :en-US] for :ar" do
      @fallbacks[:ar].should == [:ar, :"en-US"]
    end
    
    it "returns [:ar-EG, :ar, :en-US] for :ar-EG" do
      @fallbacks[:"ar-EG"].should == [:"ar-EG", :ar, :"en-US"]
    end
    
    it "returns [:ar-PA, :ar, :he-IL, :he, :en-US] for :ar-PA" do
      @fallbacks[:"ar-PA"].should == [:"ar-PA", :ar, :"he-IL", :he, :"en-US"]
    end
  end
  
  # Sami people live in several scandinavian countries. In Finnland many people
  # know Swedish and Finnish. Thus, it can be assumed that Sami living in 
  # Finnland also speak Swedish and Finnish.
  describe "with a mapping sms => [se-FI, fi-FI] defined" do
    before :each do
      @fallbacks.map :sms => [:"se-FI", :"fi-FI"]
    end
    
    it "returns [:sms-FI, :sms, :se-FI, :se, :fi-FI, :fi, :en-US] for :sms-FI" do
      @fallbacks[:"sms-FI"].should == [:"sms-FI", :sms, :"se-FI", :se, :"fi-FI", :fi, :"en-US"]
    end
  end
  
  describe "with a mapping de-AT => de-DE defined" do
    before :each do
      @fallbacks.map :"de-AT" => :"de-DE"
    end
    
    it "returns [:de, :en-US] for de" do
      @fallbacks[:"de"].should == [:de, :"en-US"]
    end
    
    it "returns [:de-DE, :de, :en-US] for de-DE" do
      @fallbacks[:"de-DE"].should == [:"de-DE", :de, :"en-US"]
    end
    
    it "returns [:de-AT, :de, :de-DE, :en-US] for de-AT" do
      @fallbacks[:"de-AT"].should == [:"de-AT", :de, :"de-DE", :"en-US"]
    end
  end
end