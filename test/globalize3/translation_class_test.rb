require File.expand_path('../../test_helper', __FILE__)

class TranlationClassTest < Test::Unit::TestCase
  test 'defines a Translation class nested in the model class' do
    assert Post.const_defined?(:Translation)
  end

  test 'defines a belongs_to association' do
    assert_belongs_to Post::Translation, :post
  end

  test 'defines a reader for :locale that returns a symbol' do
    post = Post::Translation.new
    post.send(:write_attribute, 'locale', 'de')
    assert_equal :de, post.locale
  end

  test 'defines a write for :locale that writes a string' do
    post = Post::Translation.new
    post.locale = :de
    assert_equal 'de', post.read_attribute('locale')
  end
end


