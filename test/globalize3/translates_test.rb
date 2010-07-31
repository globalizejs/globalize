require File.expand_path('../../test_helper', __FILE__)

# TODO move these elsewhere

class TranslatesTest < Test::Unit::TestCase
  # test 'defines a :locale accessors on ActiveRecord::Base' do
  #   ActiveRecord::Base.locale = :de
  #   assert_equal :de, ActiveRecord::Base.locale
  # end
  # 
  # test 'the :locale reader on ActiveRecord::Base does not default to I18n.locale (anymore)' do
  #   I18n.locale = :en
  #   assert_nil ActiveRecord::Base.locale
  # end
  # 
  # test 'ActiveRecord::Base.with_locale temporarily sets the given locale and yields the block' do
  #   I18n.locale = :en
  #   post = Post.with_locale(:de) do
  #     Post.create!(:title => 'Titel', :content => 'Inhalt')
  #   end
  #   assert_nil Post.locale
  #   assert_equal :en, I18n.locale
  # 
  #   I18n.locale = :de
  #   assert_equal 'Titel', post.title
  # end

  test 'translation_class returns the Translation class' do
    assert_equal Post::Translation, Post.translation_class
  end

  test 'defines a has_many association on the model class' do
    assert_has_many Post, :translations
  end

  test 'defines a scope for retrieving locales that have complete translations' do
    post = Post.create!(:title => 'title', :content => 'content')
    assert_equal [:en], post.translated_locales
  end

  test 'sets the given attributes to translated_attribute_names' do
    assert_equal [:title, :content], Post.translated_attribute_names
  end

  test 'defines accessors for the translated attributes' do
    post = Post.new
    assert post.respond_to?(:title)
    assert post.respond_to?(:title=)
  end

  # test 'attribute reader without arguments will use the current locale on ActiveRecord::Base or I18n' do
  #   post = with_locale(:de) do
  #     Post.create!(:title => 'Titel', :content => 'Inhalt')
  #   end
  #   I18n.locale = :de
  #   assert_equal 'Titel', post.title
  # 
  #   I18n.locale = :en
  #   ActiveRecord::Base.locale = :de
  #   assert_equal 'Titel', post.title
  # end

  test 'attribute reader when passed a locale will use the given locale' do
    post = with_locale(:de) do
      Post.create!(:title => 'Titel', :content => 'Inhalt')
    end
    assert_equal 'Titel', post.title(:de)
  end

  # test 'attribute reader will use the current locale on ActiveRecord::Base or I18n' do
  #   post = with_locale(:en) do
  #     Post.create!(:title => 'title', :content => 'content')
  #   end
  #   I18n.locale = :de
  #   post.title = 'Titel'
  #   assert_equal 'Titel', post.title
  # 
  #   ActiveRecord::Base.locale = :en
  #   post.title = 'title'
  #   assert_equal 'title', post.title
  # end
end
