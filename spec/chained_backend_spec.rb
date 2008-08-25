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

# describe I18n::Backend::Chain, '#add' do
#   before :each do
#     I18n.backend = I18n::Backend::Chain.new
#   end
#   
#   it "allows to add backends" do
#     lambda{ I18n.backend.add I18n::Backend::Spec.new }.should_not raise_error
#     I18n.backend.send(:backends).first.should be_instance_of(I18n::Backend::Spec)
#   end
# end

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



