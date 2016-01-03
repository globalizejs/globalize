# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AccessorsTest < MiniTest::Spec
  describe '*_translations reader' do
    it 'is defined for translated attributes' do
      assert User.new.respond_to?(:name_translations)
    end

    it 'is not defined for untranslated attributes' do
      assert !User.new.respond_to?(:email_translations)
    end

    describe 'new instance' do

      it 'returns empty hash by default' do
        user = User.new
        translations = {}
        assert_equal translations, user.name_translations
      end

      it 'returns hash of translated values in each locale once assigned' do
        user = User.new(:name => 'John')
        translations = {:en => 'John'}.stringify_keys!
        assert_equal translations, user.name_translations

        with_locale(:de) { user.name = 'Jan' }
        translations = {:en => 'John', :de => 'Jan'}.stringify_keys!
        assert_equal translations, user.name_translations
      end
    end

    describe 'created record' do
      it 'returns hash of translated values in each locale' do
        user = User.create(:name => 'John', :email => 'mad@max.com')
        translations = {:en => 'John'}.stringify_keys!
        assert_equal translations, user.name_translations

        with_locale(:de) { user.name = 'Jan' }
        translations = {:en => 'John', :de => 'Jan'}.stringify_keys!
        assert_equal translations, user.name_translations

        user.save
        assert_equal translations, user.name_translations

        user.reload
        assert_equal translations, user.name_translations
      end
    end
  end

  describe '*_translations writer' do
    it 'is defined for translated attributes' do
      assert User.new.respond_to?(:name_translations=)
    end

    it 'is not defined for untranslated attributes' do
      assert !User.new.respond_to?(:email_translations=)
    end

    describe 'new instance' do
      it "sets translated values in each locale from hash" do
        user = User.new(:name => 'Max', :email => 'mad@max.com')
        user.name_translations = {:en => 'John', :de => 'Jan', :ru => 'Иван'}
        assert_translated user, :en, :name, 'John'
        assert_translated user, :de, :name, 'Jan'
        assert_translated user, :ru, :name, 'Иван'

        user.save
        assert_translated user, :en, :name, 'John'
        assert_translated user, :de, :name, 'Jan'
        assert_translated user, :ru, :name, 'Иван'
      end
    end

    describe 'created record' do
      it 'sets translated values in each locale from hash' do
        user = User.create(:name => 'Max', :email => 'mad@max.com')
        user.name_translations = {:en => 'John', :de => 'Jan', :ru => 'Иван'}
        assert_translated user, :en, :name, 'John'
        assert_translated user, :de, :name, 'Jan'
        assert_translated user, :ru, :name, 'Иван'

        translations = {:en => 'John', :de => 'Jan', :ru => 'Иван'}.stringify_keys!
        assert_equal translations, user.name_translations
      end
    end
  end
end
