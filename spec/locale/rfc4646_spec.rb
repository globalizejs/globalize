require File.dirname(__FILE__) + '/../spec/helper.rb'

include Globalize::Locale

describe Globalize::Locale::Rfc4646 do
  it "given a valid tag 'de' returns an Rfc4646::Tag from #tag" do
    Rfc4646.tag('de').should be_instance_of(Rfc4646::Tag)
  end
end

describe Rfc4646::Simple, '#match' do
  it "given a valid tag 'de' returns an array of subtags" do
    Rfc4646::Simple.match('de').should == ['de', nil, nil, nil, nil, nil, nil]
  end
  
  it "given a valid tag 'de' returns an array of subtags" do
    Rfc4646::Simple.match('de-DE').should == ['de', nil, 'DE', nil, nil, nil, nil]
  end
  
  it "given a valid lowercase tag 'de-latn-de-variant-x-phonebk' returns an array of subtags" do
    Rfc4646::Simple.match('de-latn-de-variant-x-phonebk').should == ['de', 'latn', 'de', 'variant', nil, 'x-phonebk', nil]
  end
  
  it "given a valid uppercase tag 'DE-LATN-DE-VARIANT-X-PHONEBK' returns an array of subtags" do
    Rfc4646::Simple.match('DE-LATN-DE-VARIANT-X-PHONEBK').should == ['DE', 'LATN', 'DE', 'VARIANT', nil, 'X-PHONEBK', nil]
  end
  
  it "given an invalid tag 'a-DE' it returns false" do
    Rfc4646::Simple.match('a-DE').should == false
  end
  
  it "given an invalid tag 'de-419-DE' it returns false" do
    Rfc4646::Simple.match('de-419-DE').should == false
  end
end

describe "Rfc4646::Tag for the locale 'DE-latn-de-Variant-a-ext-x-phonebk-i-klingon'" do
  before :each do
    subtags = %w(de Latn DE variant a-ext x-phonebk i-klingon)
    @tag = Rfc4646::Tag.new *subtags
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

describe "Rfc4646::Tag inheritance" do
  it "returns 'de-Latn-DE-variant-a-ext-x-phonebk' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
    tag = Rfc4646::Tag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
    tag.parent.to_s.should == 'de-Latn-DE-variant-a-ext-x-phonebk'
  end
  
  it "returns 'de-Latn-DE-variant-a-ext' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk'" do
    tag = Rfc4646::Tag.new *%w(de Latn DE variant a-ext x-phonebk)
    tag.parent.to_s.should == 'de-Latn-DE-variant-a-ext'
  end
  
  it "returns 'de-Latn-DE-variant' as the parent of 'de-Latn-DE-variant-a-ext'" do
    tag = Rfc4646::Tag.new *%w(de Latn DE variant a-ext)
    tag.parent.to_s.should == 'de-Latn-DE-variant'
  end
  
  it "returns 'de-Latn-DE' as the parent of 'de-Latn-DE-variant'" do
    tag = Rfc4646::Tag.new *%w(de Latn DE variant)
    tag.parent.to_s.should == 'de-Latn-DE'
  end
  
  it "returns 'de-Latn' as the parent of 'de-Latn-DE'" do
    tag = Rfc4646::Tag.new *%w(de Latn DE)
    tag.parent.to_s.should == 'de-Latn'
  end
  
  it "returns 'de' as the parent of 'de-Latn'" do
    tag = Rfc4646::Tag.new *%w(de Latn)
    tag.parent.to_s.should == 'de'
  end
  
  # TODO RFC4647 says: "If no language tag matches the request, the "default" value is returned."
  # where should we set the default language?
  # it "returns '' as the parent of 'de'" do
  #   tag = Rfc4646::Tag.new *%w(de)
  #   tag.parent.to_s.should == ''
  # end
end