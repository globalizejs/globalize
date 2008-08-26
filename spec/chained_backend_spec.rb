require File.dirname(__FILE__) + '/spec_helper.rb'
require 'i18n/backend/chain'

module I18n
  module Backend
    class Spec
      def translate(locale, key, options = {})
      end
    end
  end
end

describe I18n, '.chain_backends' do
  it "instantiates a chained backend and sets it as backend" do
    lambda{ I18n.chain_backends }.should_not raise_error
    I18n.backend.should be_instance_of(I18n::Backend::Chain)
  end
  
  it "passes all given arguments to the chained backends #initialize method" do
    I18n::Backend::Chain.should_receive(:new).with(:spec, :simple)
    I18n.chain_backends :spec, :simple
  end 
end

describe I18n::Backend::Chain, '#initialize' do
  it "passes all given arguments to #add assuming that they are backends" do
    # no idea how to spec that
  end
end

describe I18n::Backend::Chain, '#add' do
  before :each do
    I18n.backend = I18n::Backend::Chain.new
  end
  
  it "accepts an instance of a backend" do
    lambda{ I18n.backend.add I18n::Backend::Spec.new }.should_not raise_error
    I18n.backend.send(:backends).first.should be_instance_of(I18n::Backend::Spec)
  end
  
  it "accepts a class and instantiates the backend" do
    lambda{ I18n.backend.add I18n::Backend::Spec }.should_not raise_error
    I18n.backend.send(:backends).first.should be_instance_of(I18n::Backend::Spec)
  end
  
  it "accepts a symbol, constantizes it as a backend class and instantiates the backend" do
    lambda{ I18n.backend.add :spec }.should_not raise_error
    I18n.backend.send(:backends).first.should be_instance_of(I18n::Backend::Spec)
  end
  
  it "accepts any number of backend instances, classes or symbols" do
    lambda{ I18n.backend.add I18n::Backend::Spec.new, I18n::Backend::Spec, :spec }.should_not raise_error
    I18n.backend.send(:backends).map{|backend| backend.class }.should == [I18n::Backend::Spec, I18n::Backend::Spec, I18n::Backend::Spec]
  end
end

describe I18n::Backend::Chain do
  before :each do
    I18n.backend = I18n::Backend::Chain.new    
    @first_backend = mock 'first backend'
    @last_backend = mock 'last backend'
    I18n.backend.add @first_backend
    I18n.backend.add @last_backend
  end
  
  it "delegates #load_translations to every backend on a chain" do
    @first_backend.should_receive(:load_translations).with('translations.rb')
    @last_backend.should_receive(:load_translations).with('translations.rb')
    I18n.load_translations 'translations.rb'
  end
  
  it "delegates #store_translations to every backend on a chain" do
    @first_backend.should_receive(:store_translations).with('en-US', :foo => 'foo')
    @last_backend.should_receive(:store_translations).with('en-US', :foo => 'foo')
    I18n.store_translations 'en-US', :foo => 'foo'
  end
end

describe I18n::Backend::Chain, '#translate' do
  before :each do
    I18n.backend = I18n::Backend::Chain.new    
    @first_backend = I18n::Backend::Simple.new
    @last_backend = I18n::Backend::Simple.new    
    I18n.backend.add @first_backend
    I18n.backend.add @last_backend
  end
  
  it "delegates #translate to all backends in the order they were added" do
    @first_backend.should_receive(:translate).with('en-US', :foo, {})
    @last_backend.should_receive(:translate).with('en-US', :foo, {})
    I18n.translate :foo
  end
  
  it "returns the result from #translate from the first backend if it's not nil" do
    @first_backend.store_translations :'en-US', {:foo => 'foo from first backend'}
    @last_backend.store_translations :'en-US', {:foo => 'foo from last backend'}
    result = I18n.translate :foo
    result.should == 'foo from first backend'
  end
  
  it "returns the result from #translate from the second backend if the first one returned nil" do
    @first_backend.store_translations :'en-US', {}
    @last_backend.store_translations :'en-US', {:foo => 'foo from last backend'}    
    result = I18n.translate :foo
    result.should == 'foo from last backend'
  end
  
  it "looks up a namespace from all backends and merges them (if a result is a hash and no count option is present)" do
    @first_backend.store_translations :'en-US', {:foo => {:bar => 'bar from first backend'}}    
    @last_backend.store_translations :'en-US', {:foo => {:baz => 'baz from last backend'}}    
    result = I18n.translate :foo
    result.should == {:bar => 'bar from first backend', :baz => 'baz from last backend'}
  end
  
  it "raises a MissingTranslationData exception if no translation was found" do
    lambda{ I18n.translate :not_here, :raise => true }.should raise_error(I18n::MissingTranslationData)
  end
  
  it "raises an InvalidLocale exception if the locale is nil" do
    lambda{ I18n::Backend::Chain.new.translate nil, :foo }.should raise_error(I18n::InvalidLocale)
  end
  
  it "bulk translates a number of keys from different backends" do
    @first_backend.store_translations :'en-US', {:foo => 'foo from first backend'}
    @last_backend.store_translations :'en-US', {:bar => 'bar from last backend'}
    result = I18n.translate [:foo, :bar]
    result.should == ['foo from first backend', 'bar from last backend']
  end
  
  describe 'when called with a default option' do
    it "still calls #translate on all the backends" do
      @last_backend.should_receive :translate
      I18n.translate :not_here, :default => 'default'
    end
    
    it "returns a given default string when no backend returns a translation" do
      result = I18n.translate :not_here, :default => 'default'
      result.should == 'default'
    end
  end
end

class CustomLocalizeBackend < I18n::Backend::Simple
  def localize(locale, object, format = :default)
    "result from custom localize backend" if locale == 'custom'
  end
end

describe I18n::Backend::Chain, '#localize' do
  before :each do
    I18n.backend = I18n::Backend::Chain.new    
    @first_backend = CustomLocalizeBackend.new
    @last_backend = I18n::Backend::Simple.new    
    I18n.backend.add @first_backend
    I18n.backend.add @last_backend
    @time = Time.now
  end
  
  it "delegates #localize to all backends in the order they were added" do
    @first_backend.should_receive(:localize).with('en-US', @time, :default)
    @last_backend.should_receive(:localize).with('en-US', @time, :default)
    I18n.localize @time
  end
  
  it "returns the result from #localize from the first backend if it's not nil" do
    @last_backend.should_not_receive :localize
    result = I18n.localize @time, :locale => 'custom'
    result.should == 'result from custom localize backend'
  end
  
  it "returns the result from #localize from the second backend if the first one returned nil" do
    @last_backend.should_receive(:localize).and_return "value from last backend"
    result = I18n.localize @time
    result.should == "value from last backend"
  end
end

describe I18n::Backend::Chain, '#namespace_lookup?' do
  before :each do 
    @backend = I18n::Backend::Chain.new
  end
  
  it "returns false if the given result is not a Hash" do
    @backend.send(:namespace_lookup?, 'foo', {}).should be_false
  end
  
  it "returns false if a count option is present" do
    @backend.send(:namespace_lookup?, {:foo => 'foo'}, {:count => 1}).should be_false
  end
  
  it "returns true if the given result is a Hash AND no count option is present" do
    @backend.send(:namespace_lookup?, {:foo => 'foo'}, {}).should be_true
  end
end



