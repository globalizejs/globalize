require File.join( File.dirname(__FILE__) + '/../test_helper' )
require File.join( File.dirname(__FILE__) + '/../data/models' )

class TranslatesTest < ActiveSupport::TestCase
  def setup
    I18n.locale = nil
    ActiveRecord::Base.locale = nil
    reset_db!
  end

  test 'defines a :locale accessors on ActiveRecord::Base' do
    ActiveRecord::Base.locale = :'de-DE'
    assert_equal :'de-DE', ActiveRecord::Base.locale
  end

  test 'the :locale reader on ActiveRecord::Base defaults to I18n.locale' do
    I18n.locale = :'en-US'
    assert_equal I18n.locale, ActiveRecord::Base.locale
  end

  test 'translation_class returns the Translation class' do
    assert_equal Post::Translation, Post.translation_class
  end

  test 'defines a has_many association on the model class' do
    assert_has_many Post, :translations
  end

  test 'sets the given attributes to translated_attribute_names' do
    assert_equal [:subject, :content], Post.translated_attribute_names
  end

  test 'defines accessors for the translated attributes' do
    post = Post.new
    assert post.respond_to?(:subject)
    assert post.respond_to?(:subject=)
  end
end
