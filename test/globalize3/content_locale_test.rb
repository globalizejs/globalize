# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class ContentLocaleTest < Test::Unit::TestCase
  test "an untranslated class has locale accessors" do
    assert Blog.respond_to?(:locale)
  end

  test "locale reader can be called before a locale was set" do
    assert_nothing_raised { Class.new(ActiveRecord::Base).locale }
  end

  test 'translated class locale setting' do
    assert ActiveRecord::Base.respond_to?(:locale)
    assert_equal :en, I18n.locale
    assert_nil ActiveRecord::Base.locale

    I18n.locale = :de
    assert_equal :de, I18n.locale
    assert_nil ActiveRecord::Base.locale

    ActiveRecord::Base.locale = :es
    assert_equal :de, I18n.locale
    assert_equal :es, ActiveRecord::Base.locale

    I18n.locale = :fr
    assert_equal :fr, I18n.locale
    assert_equal :es, ActiveRecord::Base.locale
  end

  test "there's only one content locales, i.e. set on different classes are the same" do
    ActiveRecord::Base.locale = :de
    assert_equal :de, ActiveRecord::Base.locale
    assert_equal :de, Parent.locale

    Parent.locale = :es
    assert_equal :es, ActiveRecord::Base.locale
    assert_equal :es, Parent.locale
  end

  test "attribute saving goes by content locale and not global locale" do
    ActiveRecord::Base.locale = :de
    assert_equal :en, I18n.locale
    Post.create :title => 'foo'
    assert_equal :de, Post.first.translations.first.locale
  end

  test "attribute loading goes by content locale and not global locale" do
    assert_nil ActiveRecord::Base.locale

    post = Post.create(:title => 'title')
    assert_translated Post.first, :en, :title, 'title'

    ActiveRecord::Base.locale = :de
    post.update_attributes(:title => 'Titel')
    
    assert_translated Post.first, :en, :title, 'title'
    # assert_translated Post.first, :de, :title, 'Titel'
  end
end