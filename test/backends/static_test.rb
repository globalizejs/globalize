require File.join( File.dirname(__FILE__), '..', 'test_helper' )
require 'globalize/backend/static'
require 'globalize/translation'
require 'action_view'
include ActionView::Helpers::NumberHelper

I18n.locale = :'en-US'    # Need to set this, since I18n defaults to 'en'

class StaticTest < ActiveSupport::TestCase
  def setup
    I18n.backend = Globalize::Backend::Static.new
    translations = {:"en-US" => {:foo => "foo in en-US", :boz => 'boz', :buz => {:bum => 'bum'}},
                    :"en"    => {:bar => "bar in en"},
                    :"de-DE" => {:baz => "baz in de-DE"},
                    :"de"    => {:boo => "boo in de", :number => { :currency => { :format => { :unit => '€', :format => '%n %u'}}}}}
    translations.each do |locale, data| 
      I18n.backend.store_translations locale, data 
    end
    I18n.fallbacks.map :"de-DE" => :"en-US", :he => :en
  end
  
  test "returns an instance of Translation:Static" do
    translation = I18n.translate :foo
    assert_instance_of Globalize::Translation::Static, translation
  end
    
  test "returns the translation in en-US if present" do
    assert_equal "foo in en-US", I18n.translate(:foo, :locale => :"en-US") 
  end

  test "returns the translation in en if en-US is not present" do
    assert_equal "bar in en", I18n.translate(:bar, :locale => :"en-US") 
  end
  
  test "returns the translation in de-DE if present" do
    assert_equal "baz in de-DE", I18n.translate(:baz, :locale => :"de-DE") 
  end
  
  test "returns the translation in de if de-DE is not present" do
    assert_equal "boo in de", I18n.translate(:boo, :locale => :"de-DE") 
  end
  
  test "returns the translation in en-US if none of de-DE and de are present" do
    assert_equal "foo in en-US", I18n.translate(:foo, :locale => :"de-DE") 
  end

  test "returns the translation in en if none of de-DE, de and en-US are present" do
    assert_equal "bar in en", I18n.translate(:bar, :locale => :"de-DE") 
  end
  
  test "returns the translation in en if none in he is present" do
    assert_equal "bar in en", I18n.translate(:bar, :locale => :he) 
  end
  
  test "returns the given default String when the key is not present for any locale" do
    assert_equal "default", I18n.translate(:missing, :default => "default") 
  end

  test "returns the fallback translation for the key if present for a fallback locale" do
    I18n.backend.store_translations :de, :non_default => "non_default in de"
    assert_equal "non_default in de", I18n.translate(:non_default, :default => "default", :locale => :"de-DE") 
  end  

  test "returns an array of translations" do
    assert_instance_of Array, I18n.translate([:foo, :boz])
  end
  
  test "returns an array of instances of Translation::Static" do
    assert_equal [Globalize::Translation::Static], I18n.translate([:foo, :boz]).map(&:class).uniq
  end
  
  test "returns a hash of translations" do
    assert_instance_of Hash, I18n.translate(:"buz")
  end
  
  test "returns an array of translations 2" do
    assert_equal [Globalize::Translation::Static], I18n.translate(:"buz").values.map(&:class) 
  end

  test "returns currency properly formated" do
    currency = number_to_currency(10)
    assert_equal "$10.00", currency
  end

  test "returns currency properly formated for locale" do
    currency = number_to_currency(10, :locale => :'de')
    assert_equal "10.000 €", currency
  end

  test "returns currency properly formated from parameters" do
    currency = number_to_currency(10, :format => "%n %u", :unit => '€')
    assert_equal "10.00 €", currency
  end

  test "makes sure interpolation does not break even with False as string" do
    assert_equal "translation missing: en, support, array, skip_last_comma", I18n.translate(:"support.array.skip_last_comma")
  end
end

class TranslationStaticTest < ActiveSupport::TestCase
  def setup
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
  
  test "stores the actual locale" do
    assert_equal :en, greeting.locale
  end
  
  test "stores the requested locale" do
    assert_equal :'en-US', greeting.requested_locale
  end
  
  test "stores the requested key" do
    assert_equal :greeting, greeting.key
  end
  
  test "stores the options given to #translate" do
    assert_equal( {:name => "Joshua"}, greeting.options ) 
  end
  
  test "stores the original translation before test was interpolated" do
    assert_equal "Hi {{name}}", greeting.original 
  end
  
  test "stores the plural_key :one if pluralized as such" do
    message = I18n.translate :messages, :locale => :"en-US", :count => 1
    assert_equal :one, message.plural_key
  end
  
  test "stores the plural_key :other if pluralized as such" do
    messages = I18n.translate :messages, :locale => :"en-US", :count => 2
    assert_equal :other, messages.plural_key
  end
end
