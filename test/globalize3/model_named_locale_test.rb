# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class ModelNamedLocaleTest < MiniTest::Spec

  it "Accessing a model named Locale's translated name attribute" do
    Locale.create :name => "French"
    assert_equal Locale.first.name, "French"
  end

end
