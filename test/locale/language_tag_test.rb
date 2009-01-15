require File.join( File.dirname(__FILE__), '..', 'test_helper' )
require 'globalize/locale/language_tag'

include Globalize::Locale

class LanguageTagTest < ActiveSupport::TestCase
  test "given a valid tag 'de' returns an LanguageTag from #tag" do
    assert_instance_of LanguageTag, LanguageTag.tag('de')
  end

  test "given a valid tag 'de' returns an array of subtags" do
    assert_equal ['de', nil, nil, nil, nil, nil, nil], LanguageTag::SimpleParser.match('de') 
  end
  
  test "given a valid tag 'de-DE' returns an array of subtags" do
    assert_equal ['de', nil, 'DE', nil, nil, nil, nil], LanguageTag::SimpleParser.match('de-DE') 
  end
  
  test "given a valid lowercase tag 'de-latn-de-variant-x-phonebk' returns an array of subtags" do
    assert_equal ['de', 'latn', 'de', 'variant', nil, 'x-phonebk', nil], 
      LanguageTag::SimpleParser.match('de-latn-de-variant-x-phonebk') 
  end
  
  test "given a valid uppercase tag 'DE-LATN-DE-VARIANT-X-PHONEBK' returns an array of subtags" do
    assert_equal ['DE', 'LATN', 'DE', 'VARIANT', nil, 'X-PHONEBK', nil], 
      LanguageTag::SimpleParser.match('DE-LATN-DE-VARIANT-X-PHONEBK') 
  end
  
  test "given an invalid tag 'a-DE' test returns false" do
    assert !LanguageTag::SimpleParser.match('a-DE')
  end
  
  test "given an invalid tag 'de-419-DE' test returns false" do
    assert !LanguageTag::SimpleParser.match('de-419-DE')
  end
end

class DeLatnLanguageTagTest < ActiveSupport::TestCase
  def setup
    subtags = %w(de Latn DE variant a-ext x-phonebk i-klingon)
    @tag = LanguageTag.new *subtags
  end

  test "returns 'de' as the language subtag in lowercase" do
    assert_equal 'de', @tag.language
  end

  test "returns 'Latn' as the script subtag in titlecase" do
    assert_equal 'Latn', @tag.script 
  end

  test "returns 'DE' as the region subtag in uppercase" do
    assert_equal 'DE', @tag.region
  end

  test "returns 'variant' as the variant subtag in lowercase" do
    assert_equal 'variant', @tag.variant 
  end

  test "returns 'a-ext' as the extension subtag" do
    assert_equal 'a-ext', @tag.extension 
  end

  test "returns 'x-phonebk' as the privateuse subtag" do
    assert_equal 'x-phonebk', @tag.privateuse 
  end

  test "returns 'i-klingon' as the grandfathered subtag" do
    assert_equal 'i-klingon', @tag.grandfathered 
  end
  
  test "returns a formatted tag string from #to_s" do
    assert_equal 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon', @tag.to_s 
  end
  
  test "returns an array containing the formatted subtags from #to_a" do
    assert_equal %w(de Latn DE variant a-ext x-phonebk i-klingon), @tag.to_a 
  end
end

class InheritanceLanguageTagTest < ActiveSupport::TestCase
  test "returns 'de-Latn-DE-variant-a-ext-x-phonebk' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
    tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
    assert_equal 'de-Latn-DE-variant-a-ext-x-phonebk', tag.parent.to_s 
  end

  test "returns 'de-Latn-DE-variant-a-ext' as the parent of 'de-Latn-DE-variant-a-ext-x-phonebk'" do
    tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk)
    assert_equal 'de-Latn-DE-variant-a-ext', tag.parent.to_s 
  end

  test "returns 'de-Latn-DE-variant' as the parent of 'de-Latn-DE-variant-a-ext'" do
    tag = LanguageTag.new *%w(de Latn DE variant a-ext)
    assert_equal 'de-Latn-DE-variant', tag.parent.to_s 
  end

  test "returns 'de-Latn-DE' as the parent of 'de-Latn-DE-variant'" do
    tag = LanguageTag.new *%w(de Latn DE variant)
    assert_equal 'de-Latn-DE', tag.parent.to_s 
  end

  test "returns 'de-Latn' as the parent of 'de-Latn-DE'" do
    tag = LanguageTag.new *%w(de Latn DE)
    assert_equal 'de-Latn', tag.parent.to_s 
  end

  test "returns 'de' as the parent of 'de-Latn'" do
    tag = LanguageTag.new *%w(de Latn)
    assert_equal 'de', tag.parent.to_s 
  end
  
  # TODO RFC4647 says: "If no language tag matches the request, the "default" value is returned."
  # where should we set the default language?
  # test "returns '' as the parent of 'de'" do
  #   tag = LanguageTag.new *%w(de)
  #   assert_equal '', tag.parent.to_s
  # end

  test "returns an array of 5 parents for 'de-Latn-DE-variant-a-ext-x-phonebk-i-klingon'" do
    parents = %w(de-Latn-DE-variant-a-ext-x-phonebk-i-klingon 
                 de-Latn-DE-variant-a-ext-x-phonebk 
                 de-Latn-DE-variant-a-ext 
                 de-Latn-DE-variant 
                 de-Latn-DE 
                 de-Latn 
                 de) 
    tag = LanguageTag.new *%w(de Latn DE variant a-ext x-phonebk i-klingon)
    assert_equal parents, tag.parents.map{|tag| tag.to_s} 
  end  
end
