# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AccessorsTest < Test::Unit::TestCase
  test "*_translatons methods are generated" do
    assert User.new.respond_to?(:name_translations)
    assert User.new.respond_to?(:name_translations=)
  end

  test "new user name_translations" do
    user = User.new
    translations = {}
    assert_equal translations, user.name_translations
  end

  test "new user name_translations with name assigned" do
    user = User.new(:name => 'John')
    translations = {:en => 'John'}.stringify_keys!
    assert_equal translations, user.name_translations

    with_locale(:de) { user.name = 'Jan' }
    translations = {:en => 'John', :de => 'Jan'}.stringify_keys!
    assert_equal translations, user.name_translations
  end

  test "created user name_translations" do
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

  test "new user name_translations=" do
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

  test "created user name_translations=" do
    user = User.create(:name => 'Max', :email => 'mad@max.com')
    user.name_translations = {:en => 'John', :de => 'Jan', :ru => 'Иван'}
    assert_translated user, :en, :name, 'John'
    assert_translated user, :de, :name, 'Jan'
    assert_translated user, :ru, :name, 'Иван'

    translations = {:en => 'John', :de => 'Jan', :ru => 'Иван'}.stringify_keys!
    assert_equal translations, user.name_translations
  end

  test "*_<locale> accessors are generated" do
    assert AccessorsPost.new.respond_to?(:title_en)
    assert AccessorsPost.new.respond_to?(:title_fr)
    assert AccessorsPost.new.respond_to?(:title_en=)
    assert AccessorsPost.new.respond_to?(:title_fr=)
  end

  test "post title_* getter" do
    post = AccessorsPost.new(:title => 'title')
    Globalize.with_locale(:fr) { post.title = 'titre' }
    assert_equal post.title_en, 'title'
    assert_equal post.title_fr, 'titre'
  end

  test "post title_* setter" do
    post = AccessorsPost.new(:title => 'title')
    post.title_fr = 'titre'
    assert_equal 'title', post.title
    assert_equal 'titre', Globalize.with_locale(:fr) { post.title }
  end
end
