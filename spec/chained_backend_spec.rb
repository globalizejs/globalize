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

describe I18n::Backend::Chain, '#add' do
  before :each do
    I18n.backend = I18n::Backend::Chain.new
  end
  
  it "allows to add backends" do
    lambda{ I18n.backend.add I18n::Backend::Spec.new }.should_not raise_error
    I18n.backend.send(:backends).first.should be_instance_of(I18n::Backend::Spec)
  end
end

describe I18n::Backend::Chain, '#translate' do
  before :each do
    I18n.backend = I18n::Backend::Chain.new
    @spec_backend = I18n::Backend::Spec.new
    @simple_backend = I18n::Backend::Simple.new
    I18n.backend.add @spec_backend
    I18n.backend.add @simple_backend
  end
  
  it "delegates #translate to all backends in the order they were added" do
    @spec_backend.should_receive(:translate).with('en-US', :foo, {})
    @simple_backend.should_receive(:translate).with('en-US', :foo, {})
    I18n.translate :foo
  end
  
  it "returns the result from #translate from the first backend if it's not nil" do
    @spec_backend.should_receive(:translate).and_return('result from first backend')
    result = I18n.translate :foo
    result.should == 'result from first backend'
  end
  
  it "returns the result from #translate from the second backend if the first one returned nil" do
    @spec_backend.should_receive(:translate).and_return(nil)
    @simple_backend.should_receive(:translate).and_return('result from second backend')
    result = I18n.translate :foo
    result.should == 'result from second backend'
  end
end