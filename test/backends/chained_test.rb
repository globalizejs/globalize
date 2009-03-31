require File.join( File.dirname(__FILE__), '..', 'test_helper' )
require 'globalize/backend/chain'

module Globalize
  module Backend
    class Dummy
      def translate(locale, key, options = {})
      end
    end
  end
end

class ChainedTest < ActiveSupport::TestCase
  
  test "instantiates a chained backend and sets test as backend" do
    assert_nothing_raised { I18n.chain_backends }
    assert_instance_of Globalize::Backend::Chain, I18n.backend
  end
  
  test "passes all given arguments to the chained backends #initialize method" do
    Globalize::Backend::Chain.expects(:new).with(:spec, :simple)
    I18n.chain_backends :spec, :simple
  end

  test "passes all given arguments to #add assuming that they are backends" do
    # no idea how to spec that
  end
end

class AddChainedTest < ActiveSupport::TestCase
  def setup
    I18n.backend = Globalize::Backend::Chain.new  
  end
  
  test "accepts an instance of a backend" do
    assert_nothing_raised { I18n.backend.add Globalize::Backend::Dummy.new }
    assert_instance_of Globalize::Backend::Dummy, I18n.backend.send(:backends).first
  end

  test "accepts a class and instantiates the backend" do
    assert_nothing_raised { I18n.backend.add Globalize::Backend::Dummy }
    assert_instance_of Globalize::Backend::Dummy, I18n.backend.send(:backends).first
  end

  test "accepts a symbol, constantizes test as a backend class and instantiates the backend" do
    assert_nothing_raised { I18n.backend.add :dummy }
    assert_instance_of Globalize::Backend::Dummy, I18n.backend.send(:backends).first
  end

  test "accepts any number of backend instances, classes or symbols" do
    assert_nothing_raised { I18n.backend.add Globalize::Backend::Dummy.new, Globalize::Backend::Dummy, :dummy }
    assert_instance_of Globalize::Backend::Dummy, I18n.backend.send(:backends).first
    assert_equal [ Globalize::Backend::Dummy, Globalize::Backend::Dummy, Globalize::Backend::Dummy ], 
      I18n.backend.send(:backends).map{|backend| backend.class }
  end
  
end

class TranslateChainedTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :en
    I18n.backend = Globalize::Backend::Chain.new
    @first_backend = I18n::Backend::Simple.new
    @last_backend = I18n::Backend::Simple.new
    I18n.backend.add @first_backend
    I18n.backend.add @last_backend
  end

  test "delegates #translate to all backends in the order they were added" do
    @first_backend.expects(:translate).with(:en, :foo, {})
    @last_backend.expects(:translate).with(:en, :foo, {})
    I18n.translate :foo
  end

  test "returns the result from #translate from the first backend if test's not nil" do
    @first_backend.store_translations :en, {:foo => 'foo from first backend'}
    @last_backend.store_translations :en, {:foo => 'foo from last backend'}
    result = I18n.translate :foo
    assert_equal 'foo from first backend', result
  end

  test "returns the result from #translate from the second backend if the first one returned nil" do
    @first_backend.store_translations :en, {}
    @last_backend.store_translations :en, {:foo => 'foo from last backend'}
    result = I18n.translate :foo
    assert_equal 'foo from last backend', result
  end

  test "looks up a namespace from all backends and merges them (if a result is a hash and no count option is present)" do
    @first_backend.store_translations :en, {:foo => {:bar => 'bar from first backend'}}
    @last_backend.store_translations :en, {:foo => {:baz => 'baz from last backend'}}
    result = I18n.translate :foo
    assert_equal( {:bar => 'bar from first backend', :baz => 'baz from last backend'}, result )
  end

  test "raises a MissingTranslationData exception if no translation was found" do
    assert_raise( I18n::MissingTranslationData ) { I18n.translate :not_here, :raise => true }
  end

  test "raises an InvalidLocale exception if the locale is nil" do
    assert_raise( I18n::InvalidLocale ) { Globalize::Backend::Chain.new.translate nil, :foo }
  end

  test "bulk translates a number of keys from different backends" do
    @first_backend.store_translations :en, {:foo => 'foo from first backend'}
    @last_backend.store_translations :en, {:bar => 'bar from last backend'}
    result = I18n.translate [:foo, :bar]
    assert_equal( ['foo from first backend', 'bar from last backend'], result )
  end

  test "still calls #translate on all the backends" do
    @last_backend.expects :translate
    I18n.translate :not_here, :default => 'default'
  end

  test "returns a given default string when no backend returns a translation" do
    result = I18n.translate :not_here, :default => 'default'
    assert_equal 'default', result
  end

end

class CustomLocalizeBackend < I18n::Backend::Simple
  def localize(locale, object, format = :default)
    "result from custom localize backend" if locale == 'custom'
  end
end

class LocalizeChainedTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :en
    I18n.backend = Globalize::Backend::Chain.new
    @first_backend = CustomLocalizeBackend.new
    @last_backend = I18n::Backend::Simple.new
    I18n.backend.add @first_backend
    I18n.backend.add @last_backend
    @time = Time.now
  end

  test "delegates #localize to all backends in the order they were added" do
    @first_backend.expects(:localize).with(:en, @time, :default)
    @last_backend.expects(:localize).with(:en, @time, :default)
    I18n.localize @time
  end

  test "returns the result from #localize from the first backend if test's not nil" do
    @last_backend.expects(:localize).never
    result = I18n.localize @time, :locale => 'custom'
    assert_equal 'result from custom localize backend', result
  end

  test "returns the result from #localize from the second backend if the first one returned nil" do
    @last_backend.expects(:localize).returns "value from last backend"
    result = I18n.localize @time
    assert_equal 'value from last backend', result
  end
end

class NamespaceChainedTest < ActiveSupport::TestCase
  def setup
    @backend = Globalize::Backend::Chain.new
  end
  
  test "returns false if the given result is not a Hash" do
    assert !@backend.send(:namespace_lookup?, 'foo', {})
  end

  test "returns false if a count option is present" do
    assert !@backend.send(:namespace_lookup?, {:foo => 'foo'}, {:count => 1})
  end

  test "returns true if the given result is a Hash AND no count option is present" do
    assert @backend.send(:namespace_lookup?, {:foo => 'foo'}, {})
  end  
end
