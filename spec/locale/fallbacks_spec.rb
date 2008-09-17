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
    I18n.fallbacks.should == { :en => [:en, :"en-US", :root] }
  end

  it "#default always reflects the I18n.default_locale if no default has been set manually" do
    I18n.default_locale = :'en-US'
    I18n.fallbacks.default.should == I18n.default_locale
    I18n.default_locale = :'de-DE'
    I18n.fallbacks.default.should == I18n.default_locale
  end

  it "#default always reflects the manually set locale if present" do
    I18n.fallbacks = Fallbacks.new(:'fi-FI')
    I18n.fallbacks.default.should == :'fi-FI'
    I18n.default_locale = :'de-DE'
    I18n.fallbacks.default.should == :'fi-FI'
  end
end

describe Fallbacks, "#compute with default set to en-US" do
  before do
    @fallbacks = Fallbacks.new(:'en-US')
  end

  describe "with no mappings defined" do
    it "returns [:es, :en-US, :root] for :es" do
      @fallbacks[:es].should == [:es, :"en-US", :en, :root]
    end

    it "returns [:es-ES, :es, :en-US, :root] for :es-ES" do
      @fallbacks[:"es-ES"].should == [:"es-ES", :es, :"en-US", :en, :root]
    end

    it "returns [:es-MX, :es, :en-US, :root] for :es-MX" do
      @fallbacks[:"es-MX"].should == [:"es-MX", :es, :"en-US", :en, :root]
    end

    it "returns [:es-Latn-ES, :es-Latn, :es, :en-US, :root] for :es-Latn-ES" do
      @fallbacks[:'es-Latn-ES'].should == [:"es-Latn-ES", :"es-Latn", :es, :"en-US", :en, :root]
    end

    it "returns [:en, :en-US, :root] for :en" do
      @fallbacks[:en].should == [:en, :"en-US", :root]
    end

    it "returns [:en-US, :en, :root] for :en-US (special case: locale == default)" do
      @fallbacks[:"en-US"].should == [:"en-US", :en, :root]
    end
  end

  # Most people who speak Catalan also live in Spain, so it is safe to assume
  # that they also speak Spanish as spoken in Spain.
  describe "with a mapping :ca => es-ES defined" do
    before :each do
      @fallbacks.map :ca => :"es-ES"
    end

    it "returns [:ca, :es-ES, :es, :en-US, :root] for :ca" do
      @fallbacks[:ca].should == [:ca, :"es-ES", :es, :"en-US", :en, :root]
    end

    it "returns [:ca-ES, :ca, :es-ES, :es, :en-US, :root] for :ca-ES" do
      @fallbacks[:"ca-ES"].should == [:"ca-ES", :ca, :"es-ES", :es, :"en-US", :en, :root]
    end
  end

  # People who speak Arabic as spoken in Palestine often times also speak
  # Hebrew as spoken in Israel. However it is in no way safe to assume that
  # everybody who speaks Arabic also speaks Hebrew.
  describe "with a mapping :ar-PS => he-IL defined" do
    before :each do
      @fallbacks.map :"ar-PS" => :"he-IL"
    end

    it "returns [:ar, :en-US, :root] for :ar" do
      @fallbacks[:ar].should == [:ar, :"en-US", :en, :root]
    end

    it "returns [:ar-EG, :ar, :en-US, :root] for :ar-EG" do
      @fallbacks[:"ar-EG"].should == [:"ar-EG", :ar, :"en-US", :en, :root]
    end

    it "returns [:ar-PS, :ar, :he-IL, :he, :en-US, :root] for :ar-PS" do
      @fallbacks[:"ar-PS"].should == [:"ar-PS", :ar, :"he-IL", :he, :"en-US", :en, :root]
    end
  end

  # Sami people live in several scandinavian countries. In Finnland many people
  # know Swedish and Finnish. Thus, it can be assumed that Sami living in
  # Finnland also speak Swedish and Finnish.
  describe "with a mapping sms => [se-FI, fi-FI] defined" do
    before :each do
      @fallbacks.map :sms => [:"se-FI", :"fi-FI"]
    end

    it "returns [:sms-FI, :sms, :se-FI, :se, :fi-FI, :fi, :en-US, :root] for :sms-FI" do
      @fallbacks[:"sms-FI"].should == [:"sms-FI", :sms, :"se-FI", :se, :"fi-FI", :fi, :"en-US", :en, :root]
    end
  end

  describe "with a mapping de-AT => de-DE defined" do
    before :each do
      @fallbacks.map :"de-AT" => :"de-DE"
    end

    it "returns [:de, :en-US, :root] for de" do
      @fallbacks[:"de"].should == [:de, :"en-US", :en, :root]
    end

    it "returns [:de-DE, :de, :en-US, :root] for de-DE" do
      @fallbacks[:"de-DE"].should == [:"de-DE", :de, :"en-US", :en, :root]
    end

    it "returns [:de-AT, :de, :de-DE, :en-US, :root] for de-AT" do
      @fallbacks[:"de-AT"].should == [:"de-AT", :de, :"de-DE", :"en-US", :en, :root]
    end
  end

  describe "with a mapping de => en, he => en" do
    before :each do
      @fallbacks.map :de => :en, :he => :en
    end
    
    it "returns [:de, :en, :root] for :de" do
      @fallbacks[:de].should == [:de, :en, :"en-US", :root]
    end
    
    it "returns [:he, :en, :root] for :de" do
      @fallbacks[:he].should == [:he, :en, :"en-US", :root]
    end
  end
end
