require File.dirname(__FILE__) + '/spec_helper.rb'
require 'globalize/fallbacks'
require 'rfc4646'

include Globalize

describe Fallbacks do
  before do
    @fallbacks = Fallbacks.new
  end
  
  it "returns correct fallbacks for en" do
    @fallbacks.compute('en').should be_empty
  end

  it "returns correct fallbacks for en-US" do
    @fallbacks.compute('en-US').should include(Rfc4646::tag('en'))
  end

  it "returns correct fallbacks for de, given en as default" do
    @fallbacks.add 'de', 'en'
    @fallbacks.compute('de').should include(Rfc4646::tag('en'))
  end

  # Add lots of other tests that won't pass and will require changes in code
  it "returns correct fallbacks for en-Latn-US" do
    fallbacks = @fallbacks.compute('en-Latn-US') 
    fallbacks.should include(Rfc4646::tag('en'))
    fallbacks.should include(Rfc4646::tag('en-Latn'))
    fallbacks.should include(Rfc4646::tag('en-US'))
  end
  
  # Test for correct resolution down fallback tree; e.g., 'de-DE' -> 'de' -> 'en'
end
