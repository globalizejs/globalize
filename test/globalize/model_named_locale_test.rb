# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class ModelNamedLocaleTest < MiniTest::Spec
  describe 'translated attribute reader on model named "Locale"' do
    it "returns the correct translation" do
      Locale.create :name => "French"
      assert_equal Locale.first.name, "French"
    end
  end
end
