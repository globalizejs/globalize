require File.expand_path(File.dirname(__FILE__) + '/../test_helper')
require File.expand_path(File.dirname(__FILE__) + '/../data/models')

class TranlationClassTest < ActiveSupport::TestCase
  def setup
    reset_db!
  end

  test 'defines a Translation class nested in the model class' do
    assert Post.const_defined?(:Translation)
  end

  test 'defines a belongs_to association' do
    assert_belongs_to Post::Translation, :post
  end

  test 'defines a reader for :locale that always returns a symbol' do
    post = Post::Translation.new
    post.write_attribute('locale', 'de')
    assert_equal :de, post.locale
  end

  test 'defines a write for :locale that always writes a string' do
    post = Post::Translation.new
    post.locale = :de
    assert_equal 'de', post.read_attribute('locale')
  end
end


