require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/locale/fallbacks'
require 'globalize/locale/language_tag'

include Globalize::Locale

describe Fallbacks, '#[]' do
  before do
    @fallbacks = Fallbacks.new(:'en-US')
  end
  
  it "caches computed results" do
    @fallbacks['en']
    @fallbacks.should == { :en => [:en, :"en-US"] }
  end
end

describe Fallbacks, "#compute with root set to en-US" do
  before do
    @fallbacks = Fallbacks.new(:'en-US')
  end
  
  describe "with no mappings defined" do
    it "returns [:es, :en-US] for :es" do
      @fallbacks.compute(:es).should == [:es, :"en-US"]
    end
  
    it "returns [:es-ES, :es, :en-US] for :es-ES" do
      @fallbacks.compute(:"es-ES").should == [:"es-ES", :es, :"en-US"]
    end
    
    it "returns [:es-MX, :es, :en-US] for :es-MX" do
      @fallbacks.compute(:"es-MX").should == [:"es-MX", :es, :"en-US"]
    end
    
    it "returns [:es-Latn-ES, :es-Latn, :es, :en-US] for :es-Latn-ES" do
      @fallbacks.compute(:'es-Latn-ES').should == [:"es-Latn-ES", :"es-Latn", :es, :"en-US"]
    end
    it "returns [:en, :en-US] for :en" do
      @fallbacks.compute(:en).should == [:en, :"en-US"]
    end
      
    it "returns [:en-US] for :en-US (special case: locale == root)" do 
      @fallbacks.compute(:"en-US").should == [:"en-US"]
    end
  end
  
  # Most people who speak Catalan also live in Spain, so it is safe to assume
  # that they also speak Spanish as spoken in Spain.
  describe "with a mapping :ca => es-ES defined" do
    before :each do
      @fallbacks.map :ca => :"es-ES"
    end
    
    it "returns [:ca, :es-ES, :es, :en-US] for :ca" do
      @fallbacks.compute(:ca).should == [:ca, :"es-ES", :es, :"en-US"]
    end
    
    it "returns [:ca-ES, :ca, :es-ES, :es, :en-US] for :ca-ES" do
      @fallbacks.compute(:"ca-ES").should == [:"ca-ES", :ca, :"es-ES", :es, :"en-US"]
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
      @fallbacks.compute(:ar).should == [:ar, :"en-US"]
    end
    
    it "returns [:ar-EG, :ar, :en-US] for :ar-EG" do
      @fallbacks.compute(:"ar-EG").should == [:"ar-EG", :ar, :"en-US"]
    end
    
    it "returns [:ar-PA, :ar, :he-IL, :he, :en-US] for :ar-PA" do
      @fallbacks.compute(:"ar-PA").should == [:"ar-PA", :ar, :"he-IL", :he, :"en-US"]
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
      @fallbacks.compute(:"sms-FI").should == [:"sms-FI", :sms, :"se-FI", :se, :"fi-FI", :fi, :"en-US"]
    end
  end
  
  describe "with a mapping de-AT => de-DE defined" do
    before :each do
      @fallbacks.map :"de-AT" => :"de-DE"
    end
    
    it "returns [:de, :en-US] for de" do
      @fallbacks.compute(:"de").should == [:de, :"en-US"]
    end
    
    it "returns [:de-DE, :de, :en-US] for de-DE" do
      @fallbacks.compute(:"de-DE").should == [:"de-DE", :de, :"en-US"]
    end
    
    it "returns [:de-AT, :de, :de-DE, :en-US] for de-AT" do
      @fallbacks.compute(:"de-AT").should == [:"de-AT", :de, :"de-DE", :"en-US"]
    end
  end
end