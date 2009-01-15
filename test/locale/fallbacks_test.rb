require File.join( File.dirname(__FILE__), '..', 'test_helper' )
require 'globalize/locale/fallbacks'

include Globalize::Locale
I18n.default_locale = :'en-US'    # This has to be set explicitly, no longer default for I18n

class FallbacksTest < ActiveSupport::TestCase
  def setup
    I18n.fallbacks = Fallbacks.new
  end

  def teardown
    I18n.default_locale = :'en-US'
  end

  test "#[] caches computed results" do
    I18n.fallbacks['en']
    assert_equal( { :en => [:en, :"en-US", :root] }, I18n.fallbacks ) 
  end

  test "#defaults always reflect the I18n.default_locale if no default has been set manually" do
    I18n.default_locale = :'en-US'
    assert_equal( [:'en-US', :en, :root], I18n.fallbacks.defaults ) 
  end

  test "#defaults always reflect a manually passed default locale if any" do
    I18n.fallbacks = Fallbacks.new(:'fi-FI')
    assert_equal( [:'fi-FI', :fi, :root], I18n.fallbacks.defaults ) 
    I18n.default_locale = :'de-DE'
    assert_equal( [:'fi-FI', :fi, :root], I18n.fallbacks.defaults ) 
  end

  test "#defaults allows to set multiple defaults" do
    I18n.fallbacks = Fallbacks.new(:'fi-FI', :'se-FI')
    assert_equal( [:'fi-FI', :fi, :'se-FI', :se, :root], I18n.fallbacks.defaults ) 
  end
end

class NoMappingFallbacksTest < ActiveSupport::TestCase
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
  end

  test "returns [:es, :en-US, :root] for :es" do
    assert_equal [:es, :"en-US", :en, :root], @fallbacks[:es] 
  end

  test "returns [:es-ES, :es, :en-US, :root] for :es-ES" do
    assert_equal [:"es-ES", :es, :"en-US", :en, :root], @fallbacks[:"es-ES"] 
  end

  test "returns [:es-MX, :es, :en-US, :root] for :es-MX" do
    assert_equal [:"es-MX", :es, :"en-US", :en, :root], @fallbacks[:"es-MX"] 
  end

  test "returns [:es-Latn-ES, :es-Latn, :es, :en-US, :root] for :es-Latn-ES" do
    assert_equal [:"es-Latn-ES", :"es-Latn", :es, :"en-US", :en, :root], @fallbacks[:'es-Latn-ES'] 
  end

  test "returns [:en, :en-US, :root] for :en" do
    assert_equal [:en, :"en-US", :root], @fallbacks[:en] 
  end

  test "returns [:en-US, :en, :root] for :en-US (special case: locale == default)" do
    assert_equal [:"en-US", :en, :root], @fallbacks[:"en-US"] 
  end
end

class CaMappingFallbacksTest < ActiveSupport::TestCase
  # Most people who speak Catalan also live in Spain, so test is safe to assume
  # that they also speak Spanish as spoken in Spain.
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
    @fallbacks.map :ca => :"es-ES"
  end

  test "returns [:ca, :es-ES, :es, :en-US, :root] for :ca" do
    assert_equal [:ca, :"es-ES", :es, :"en-US", :en, :root], @fallbacks[:ca] 
  end

  test "returns [:ca-ES, :ca, :es-ES, :es, :en-US, :root] for :ca-ES" do
    assert_equal [:"ca-ES", :ca, :"es-ES", :es, :"en-US", :en, :root], @fallbacks[:"ca-ES"] 
  end
end

class ArMappingFallbacksTest < ActiveSupport::TestCase
  # People who speak Arabic as spoken in Palestine often times also speak
  # Hebrew as spoken in Israel. However test is in no way safe to assume that
  # everybody who speaks Arabic also speaks Hebrew.
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
    @fallbacks.map :"ar-PS" => :"he-IL"
  end

  test "returns [:ar, :en-US, :root] for :ar" do
    assert_equal [:ar, :"en-US", :en, :root], @fallbacks[:ar] 
  end

  test "returns [:ar-EG, :ar, :en-US, :root] for :ar-EG" do
    assert_equal [:"ar-EG", :ar, :"en-US", :en, :root], @fallbacks[:"ar-EG"] 
  end

  test "returns [:ar-PS, :ar, :he-IL, :he, :en-US, :root] for :ar-PS" do
    assert_equal [:"ar-PS", :ar, :"he-IL", :he, :"en-US", :en, :root], @fallbacks[:"ar-PS"] 
  end
end

class SmsMappingFallbacksTest < ActiveSupport::TestCase
  # Sami people live in several scandinavian countries. In Finnland many people
  # know Swedish and Finnish. Thus, test can be assumed that Sami living in
  # Finnland also speak Swedish and Finnish.
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
    @fallbacks.map :sms => [:"se-FI", :"fi-FI"]
  end

  test "returns [:sms-FI, :sms, :se-FI, :se, :fi-FI, :fi, :en-US, :root] for :sms-FI" do
    assert_equal [:"sms-FI", :sms, :"se-FI", :se, :"fi-FI", :fi, :"en-US", :en, :root], @fallbacks[:"sms-FI"] 
  end
end

class DeAtMappingFallbacksTest < ActiveSupport::TestCase
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
    @fallbacks.map :"de-AT" => :"de-DE"
  end

  test "returns [:de, :en-US, :root] for de" do
    assert_equal [:de, :"en-US", :en, :root], @fallbacks[:"de"] 
  end

  test "returns [:de-DE, :de, :en-US, :root] for de-DE" do
    assert_equal [:"de-DE", :de, :"en-US", :en, :root], @fallbacks[:"de-DE"] 
  end

  test "returns [:de-AT, :de, :de-DE, :en-US, :root] for de-AT" do
    assert_equal [:"de-AT", :de, :"de-DE", :"en-US", :en, :root], @fallbacks[:"de-AT"] 
  end
end

class DeMappingFallbacksTest < ActiveSupport::TestCase
  def setup
    @fallbacks = Fallbacks.new(:'en-US')
    @fallbacks.map :de => :en, :he => :en
  end
  
  test "returns [:de, :en, :root] for :de" do
    assert_equal [:de, :en, :"en-US", :root], @fallbacks[:de] 
  end
  
  test "returns [:he, :en, :root] for :de" do
    assert_equal [:he, :en, :"en-US", :root], @fallbacks[:he] 
  end
end
