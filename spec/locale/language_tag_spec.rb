require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/locale/language_tag'

include Globalize::Locale

describe Globalize::Locale::LanguageTag do
  it "given a valid tag 'de' returns an LanguageTag from #tag" do
    LanguageTag.tag('de').should be_instance_of(LanguageTag)
  end
end

describe LanguageTag::SimpleParser, '#match' do
  it "given a valid tag 'de' returns an array of subtags" do
    LanguageTag::SimpleParser.match('de').should == ['de', nil, nil, nil, nil, nil, nil]
  end
  
  it "given a valid tag 'de' returns an array of subtags" do
    LanguageTag::SimpleParser.match('de-DE').should == ['de', nil, 'DE', nil, nil, nil, nil]
  end
  
  it "given a valid lowercase tag 'de-latn-de-variant-x-phonebk' returns an array of subtags" do
    LanguageTag::SimpleParser.match('de-latn-de-variant-x-phonebk').should == ['de', 'latn', 'de', 'variant', nil, 'x-phonebk', nil]
  end
  
  it "given a valid uppercase tag 'DE-LATN-DE-VARIANT-X-PHONEBK' returns an array of subtags" do
    LanguageTag::SimpleParser.match('DE-LATN-DE-VARIANT-X-PHONEBK').should == ['DE', 'LATN', 'DE', 'VARIANT', nil, 'X-PHONEBK', nil]
  end
  
  it "given an invalid tag 'a-DE' it returns false" do
    LanguageTag::SimpleParser.match('a-DE').should == false
  end
  
  it "given an invalid tag 'de-419-DE' it returns false" do
    LanguageTag::SimpleParser.match('de-419-DE').should == false
  end
end

describe "LanguageTag for the locale 'DE-latn-de-Variant-a-ext-x-phonebk-i-klingon'" do
  before :each do
    subtags = %w(de Latn DE variant a-ext x-phonebk i-klingon)
    @tag = LanguageTag.new *subtags
  end

  it "returns 'de' as the language subtag in lowercase" do
    @tag.language.should == 'de'
  end

  it "returns 'Latn' as the script subtag in titlecase" do
    @tag.script.should == 'Latn'
  end

  it "returns 'DE' as the region subtag in uppercase" do
    @tag.region.should == 'DE'
  end

  it "returns 'variant' as the variant subtag in lowercase" do
    @tag.variant.should == 'variant'
  end

  it "returns 'a-ext' as the extension subtag" do
    @tag.extension.should == 'a-ext'
  end

  it "returns 'x-phonebk' as the privateuse subtag" do
    @tag.privateuse.should == 'x-phonebk'
  end

  it "returns 'i-klingon' as the grandfathered subtag" do
    @tag.grandfathered.should == 'i-klingon'
  end
  
  it "returns a formatted tag string from #to_s" do
    @tag.to_s.should == 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'
  end
  
  it "returns an array containing the formatted subtags from #to_a" do
    @tag.to_a.should == %w(de Latn DE variant a-ext x-phonebk i-klingon)
  end
end

describe "LanguageTag inheritance" do
  describe "#parent" do  
    it "returns 'de-Latn-DE-variant-a-ext-x-phonebk' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
      tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
      tag.parent.to_s.should == 'de-Latn-DE-variant-a-ext-x-phonebk'
    end
  
    it "returns 'de-Latn-DE-variant-a-ext' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk'" do
      tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk)
      tag.parent.to_s.should == 'de-Latn-DE-variant-a-ext'
    end
  
    it "returns 'de-Latn-DE-variant' as the parent of 'de-Latn-DE-variant-a-ext'" do
      tag = LanguageTag.new *%w(de Latn DE variant a-ext)
      tag.parent.to_s.should == 'de-Latn-DE-variant'
    end
  
    it "returns 'de-Latn-DE' as the parent of 'de-Latn-DE-variant'" do
      tag = LanguageTag.new *%w(de Latn DE variant)
      tag.parent.to_s.should == 'de-Latn-DE'
    end
  
    it "returns 'de-Latn' as the parent of 'de-Latn-DE'" do
      tag = LanguageTag.new *%w(de Latn DE)
      tag.parent.to_s.should == 'de-Latn'
    end
  
    it "returns 'de' as the parent of 'de-Latn'" do
      tag = LanguageTag.new *%w(de Latn)
      tag.parent.to_s.should == 'de'
    end
  
    # TODO RFC4647 says: "If no language tag matches the request, the "default" value is returned."
    # where should we set the default language?
    # it "returns '' as the parent of 'de'" do
    #   tag = LanguageTag.new *%w(de)
    #   tag.parent.to_s.should == ''
    # end
  end
  
  describe "#parents" do  
    it "returns an array of 5 parents for 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
      parents = %w(de-Latn-DE-variant-a-ext-x-phonebk-i-klingon 
                   de-Latn-DE-variant-a-ext-x-phonebk 
                   de-Latn-DE-variant-a-ext 
                   de-Latn-DE-variant 
                   de-Latn-DE 
                   de-Latn 
                   de) 
      tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
      tag.parents.map{|tag| tag.to_s}.should == parents
    end
    
    it "returns an array of 5 parents for 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
      parents = %w(de-Latn-DE-variant-a-ext-x-phonebk-i-klingon 
                   de-Latn-DE-variant-a-ext-x-phonebk 
                   de-Latn-DE-variant-a-ext 
                   de-Latn-DE-variant 
                   de-Latn-DE 
                   de-Latn 
                   de) 
      tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
      tag.parents.map{|tag| tag.to_s}.should == parents
    end
  end
end