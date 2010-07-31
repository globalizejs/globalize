# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class ContentLocaleTest < Test::Unit::TestCase
  test "Globalize has locale accessors" do
    assert Globalize.respond_to?(:locale)
    assert Globalize.respond_to?(:locale=)
  end

  test "Globalize.locale reader can be called before a locale was set" do
    Globalize.class_eval 'remove_class_variable(:@@locale)'
    assert_nothing_raised { Globalize.locale }
  end

  test 'Globalize locale setting' do
    assert_equal :en, I18n.locale
    assert_equal :en, Globalize.locale

    I18n.locale = :de
    assert_equal :de, I18n.locale
    assert_equal :de, Globalize.locale

    Globalize.locale = :es
    assert_equal :de, I18n.locale
    assert_equal :es, Globalize.locale

    I18n.locale = :fr
    assert_equal :fr, I18n.locale
    assert_equal :es, Globalize.locale
  end

  test "attribute saving goes by content locale and not global locale" do
    Globalize.locale = :de
    assert_equal :en, I18n.locale
    Post.create :title => 'foo'
    assert_equal :de, Post.first.translations.first.locale
  end

  test "attribute loading goes by content locale and not global locale" do
    post = Post.create(:title => 'title')
    assert_translated Post.first, :en, :title, 'title'

    Globalize.locale = :de
    post.update_attributes(:title => 'Titel')

    assert_translated Post.first, :en, :title, 'title'
    assert_translated Post.first, :de, :title, 'Titel'
  end
end