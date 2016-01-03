# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class InterpolationTest < MiniTest::Spec
  describe 'translated attribute reader' do
    it "interpolates arguments into translation" do
      user = User.new(:name => 'John %{surname}')
      assert_equal user.name(:surname => 'Bates'), 'John Bates'
    end

    it "leaves interpolation string when no params are passed in" do
      user = User.new(:name => 'John %{surname}')
      assert_equal user.name, 'John %{surname}'
    end

    it "raises interpolation error when no matching interpolation argument is found" do
      user = User.new(:name => 'John %{surname}')
      exception = assert_raises(I18n::MissingInterpolationArgument) {
        user.name(:foo => "bar")
      }
      assert_match(/missing interpolation argument.*John %{surname}/, exception.message)
    end
  end
end
