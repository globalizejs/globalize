# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AttributesTest < Test::Unit::TestCase
  test 'defines accessors for the translated attributes' do
    post = Post.new
    assert post.respond_to?(:title)
    assert post.respond_to?(:title=)
  end

  test 'does not save translations unless saved' do
    post = Post.new
    assert post.translations.all?(&:new_record?)

    post.title = 'something'
    assert post.translations.all?(&:new_record?)

    post.save
    assert post.translations.all?(&:persisted?)
    assert_equal 1, post.translations.length
  end

  test "attribute_names returns translated and regular attribute names" do
    assert_equal %w(blog_id content title), Post.new.attribute_names.sort & %w(blog_id content title)
  end

  test "attributes returns translated and regular attributes" do
    post = Post.create(:title => 'foo')
    attributes = post.attributes.slice('id', 'blog_id', 'title', 'content')
    assert_equal({ 'id' => post.id, 'blog_id' => nil, 'title' => 'foo', 'content' => nil }, attributes)
  end

  test "write_attribute for non-translated attributes should return the value" do
    user = User.create(:name => 'Max Mustermann', :email => 'max@mustermann.de')
    new_email = 'm.muster@mann.de'
    assert_equal new_email, user.write_attribute('email', new_email)
  end

  test 'translated_attribute_names returns translated attribute names' do
    assert_equal [:title, :content], Post.translated_attribute_names & [:title, :content]
  end

  test "a translated attribute writer returns its argument" do
    assert_equal 'foo', Post.new.title = 'foo'
  end

  test "a translated attribute reader returns the correct translation for a saved record after locale switching" do
    post = Post.create(:title => 'title')
    post.update_attributes(:title => 'Titel', :locale => :de)
    post.reload

    assert_translated post, :en, :title, 'title'
    assert_translated post, :de, :title, 'Titel'
  end

  test "a translated attribute reader returns the correct translation for an unsaved record after locale switching" do
    post = Post.create(:title => 'title')
    with_locale(:de) { post.title = 'Titel' }

    assert_translated post, :en, :title, 'title'
    assert_translated post, :de, :title, 'Titel'
  end

  test "a translated attribute reader returns the correct translation for both saved/unsaved records while switching locales" do
    post = Post.new(:title => 'title')
    with_locale(:de) { post.title = 'Titel' }
    with_locale(:he) { post.title = 'שם' }

    assert_translated post, :de, :title, 'Titel'
    assert_translated post, :he, :title, 'שם'
    assert_translated post, :en, :title, 'title'
    assert_translated post, :he, :title, 'שם'
    assert_translated post, :de, :title, 'Titel'

    post.save
    post.reload

    assert_translated post, :de, :title, 'Titel'
    assert_translated post, :he, :title, 'שם'
    assert_translated post, :en, :title, 'title'
    assert_translated post, :he, :title, 'שם'
    assert_translated post, :de, :title, 'Titel'
  end

  test "a translated attribute reader returns nil if no translations are found on an unsaved record" do
    post = Post.new(:title => 'foo')
    assert_equal 'foo', post.title
    assert_nil post.content
  end

  test "a translated attribute reader returns nil if no translations are found on a saved record" do
    post = Post.create(:title => 'foo')
    post.reload
    assert_equal 'foo', post.title
    assert_nil post.content
  end

  test "before_type_cast reader works for translated attributes" do
    post = Post.create(:title => 'title')
    post.update_attributes(:title => "Titel", :locale => :de)

    with_locale(:en) { assert_equal 'title', post.title_before_type_cast }
    with_locale(:de) { assert_equal 'Titel', post.title_before_type_cast }
  end

  test "saves all translations on an sti model after locale switching" do
    child = Child.new(:content => 'foo')
    with_locale(:de) { child.content = 'bar' }
    with_locale(:he) { child.content = 'baz' }
    child.save
    child.reload

    assert_translated child, :en, :content, 'foo'
    assert_translated child, :de, :content, 'bar'
    assert_translated child, :he, :content, 'baz'
  end

  test 'attribute reader without arguments will use the current locale on Globalize or I18n' do
    with_locale(:de) do
      Post.create!(:title => 'Titel', :content => 'Inhalt')
    end
    I18n.locale = :de
    assert_equal 'Titel', Post.first.title

    I18n.locale = :en
    Globalize.locale = :de
    assert_equal 'Titel', Post.first.title
  end

  test 'attribute reader when passed a locale will use the given locale' do
    post = with_locale(:de) do
      Post.create!(:title => 'Titel', :content => 'Inhalt')
    end
    assert_equal 'Titel', post.title(:de)
  end

  test 'modifying a translated attribute does not change the untranslated value' do
    post = Post.create(:title => 'title')
    before = post.untranslated_attributes['title']
    post.title = 'changed title'
    assert_equal post.untranslated_attributes['title'], before
  end

end
