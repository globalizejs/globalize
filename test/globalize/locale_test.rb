# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class LocaleTest < MiniTest::Spec
  
  describe Globalize do
    it 'has locale accessors' do
      assert Globalize.respond_to?(:locale)
      assert Globalize.respond_to?(:locale=)
    end

    describe '.locale' do
      it 'can be called before a locale is set' do
        Globalize.locale = nil
        Globalize.locale # should not raise
      end
    end

    describe '.locale=' do
      it 'sets locale with symbol-valued locales' do
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

      it 'sets locale with string-valued locales' do
        I18n.locale = 'de'
        Globalize.locale = 'de'
        assert_equal I18n.locale, Globalize.locale

        I18n.locale = 'de'
        Globalize.locale = :de
        assert_equal I18n.locale, Globalize.locale

        I18n.locale =  :de
        Globalize.locale = 'de'
        assert_equal I18n.locale, Globalize.locale
      end
    end

    describe '.with_locale' do
      it 'temporarily sets the given locale and yields the block' do
        assert_equal :en, Globalize.locale
        Globalize.with_locale :de do |locale|
          assert_equal :de, Globalize.locale
          assert_equal :de, locale
        end
        assert_equal :en, Globalize.locale
      end

      it 'resets the locale to the previous one even if an exception occurs in the block' do
        assert_equal :en, Globalize.locale
        begin
          Globalize.with_locale :de do |locale|
            raise
          end
        rescue Exception
        end
        assert_equal :en, Globalize.locale
      end
    end

    describe '.with_locales' do
      it 'calls block once with each locale given temporarily set' do
        locales = Globalize.with_locales :en, [:de, :fr] do |locale|
          assert_equal locale, Globalize.locale
          locale
        end
        assert_equal [:en, :de, :fr], locales
      end
    end

    describe 'accessing attributes' do
      it 'uses content locale and not global locale when setting attributes' do
        Globalize.locale = :de
        assert_equal :en, I18n.locale
        Post.create :title => 'foo'

        assert_equal :de, Post.first.translations.first.locale
      end

      it 'uses content locale and not global locale when getting attributes' do
        post = Post.create(:title => 'title')
        assert_translated Post.first, :en, :title, 'title'

        Globalize.locale = :de
        post.update_attributes(:title => 'Titel')

        assert_translated Post.first, :en, :title, 'title'
        assert_translated Post.first, :de, :title, 'Titel'
      end
    end
  end
end
