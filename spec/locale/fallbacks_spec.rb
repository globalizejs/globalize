require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/locale/fallbacks'
require 'globalize/locale/rfc4646'

include Globalize::Locale

describe Fallbacks do
  before do
    @fallbacks = Fallbacks.new
  end
  
  it "returns correct fallbacks for en" do
    fallbacks = @fallbacks.compute('en')
    fallbacks.should == %w[ en ]
  end

  it "returns correct fallbacks for en-US" do
    fallbacks = @fallbacks.compute('en-US')
    fallbacks.should == %w[ en-US en ]
  end

  it "returns correct fallbacks for de, given en as default" do
    @fallbacks.add 'de', 'en'
    fallbacks = @fallbacks.compute('de')
    fallbacks.should == %w[ de en ]
  end

  it "returns correct fallbacks for de, given en as default; rules specified at initialization" do
    fallbacks_obj = Fallbacks.new 'de' => [ 'en', 'he' ]
    fallbacks = fallbacks_obj.compute('de')
    fallbacks.should == %w[ de en he ]
  end

  # Add lots of other tests that won't pass and will require changes in code
  it "returns correct fallbacks for en-Latn-US" do
    fallbacks = @fallbacks.compute('en-Latn-US') 
    fallbacks.should == %w[ en-Latn-US en-US en-Latn en ]
  end
  
  # Test for correct resolution down fallback tree; e.g., 'de-DE' -> 'de' -> 'en'
end
