require File.expand_path(File.dirname(__FILE__) + '/../test_helper')
require File.expand_path(File.dirname(__FILE__) + '/../data/models')

class TranslatesTest < ActiveSupport::TestCase
  def setup
    I18n.locale = nil
    ActiveRecord::Base.locale = nil
    reset_db!
  end

  test 'defines a :locale accessors on ActiveRecord::Base' do
    ActiveRecord::Base.locale = :de
    assert_equal :de, ActiveRecord::Base.locale
  end

  test 'the :locale reader on ActiveRecord::Base does not default to I18n.locale (anymore)' do
    I18n.locale = :en
    assert_nil ActiveRecord::Base.locale
  end

  test 'ActiveRecord::Base.with_locale temporarily sets the given locale and yields the block' do
    I18n.locale = :en
    post = Post.with_locale(:de) do
      Post.create!(:subject => 'Titel', :content => 'Inhalt')
    end
    assert_nil Post.locale
    assert_equal :en, I18n.locale

    I18n.locale = :de
    assert_equal 'Titel', post.subject
  end

  test 'translation_class returns the Translation class' do
    assert_equal Post::Translation, Post.translation_class
  end

  test 'defines a has_many association on the model class' do
    assert_has_many Post, :translations
  end

  test 'defines a scope for retrieving locales that have complete translations' do
    post = Post.create!(:subject => 'subject', :content => 'content')
    assert_equal [:en], post.translated_locales
  end

  test 'sets the given attributes to translated_attribute_names' do
    assert_equal [:subject, :content], Post.translated_attribute_names
  end

  test 'defines accessors for the translated attributes' do
    post = Post.new
    assert post.respond_to?(:subject)
    assert post.respond_to?(:subject=)
  end

  test 'attribute reader without arguments will use the current locale on ActiveRecord::Base or I18n' do
    post = Post.with_locale(:de) do
      Post.create!(:subject => 'Titel', :content => 'Inhalt')
    end
    I18n.locale = :de
    assert_equal 'Titel', post.subject

    I18n.locale = :en
    ActiveRecord::Base.locale = :de
    assert_equal 'Titel', post.subject
  end

  test 'attribute reader when passed a locale will use the given locale' do
    post = Post.with_locale(:de) do
      Post.create!(:subject => 'Titel', :content => 'Inhalt')
    end
    assert_equal 'Titel', post.subject(:de)
  end

  test 'attribute reader will use the current locale on ActiveRecord::Base or I18n' do
    post = Post.with_locale(:en) do
      Post.create!(:subject => 'title', :content => 'content')
    end
    I18n.locale = :de
    post.subject = 'Titel'
    assert_equal 'Titel', post.subject

    ActiveRecord::Base.locale = :en
    post.subject = 'title'
    assert_equal 'title', post.subject
  end
end
