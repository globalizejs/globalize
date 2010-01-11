require File.expand_path(File.dirname(__FILE__) + '/test_helper')
require File.expand_path(File.dirname(__FILE__) + '/data/models')

# Higher level tests.

class ActiveRecordTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :en
    reset_db!
    ActiveRecord::Base.locale = nil
  end

  def assert_translated(locale, record, names, expected)
    I18n.locale = locale
    assert_equal Array(expected), Array(names).map { |name| record.send(name) }
  end

  test "a translated record has translations" do
    assert_equal [], Post.new.translations
  end

  test "saves a translated version of the record for each locale" do
    post = Post.create(:subject => 'title')
    I18n.locale = :de
    post.update_attributes(:subject => 'Titel')

    assert_equal 2, post.translations.size
    assert_equal %w(de en), post.translations.map(&:locale).map(&:to_s).sort
    assert_equal %w(Titel title), post.translations.map(&:subject).sort
  end

  test "a translated record has German translations" do
    I18n.locale = :de
    post = Post.create(:subject => 'foo')
    assert_equal 1, post.translations.size
    assert_equal [:de], post.translations.map { |t| t.locale }
  end

  test "modifiying translated fields while switching locales" do
    post = Post.create(:subject => 'title', :content => 'content')
    assert_equal %w(title content), [post.subject, post.content]

    I18n.locale = :de
    post.subject, post.content = 'Titel', 'Inhalt'

    assert_translated(:de, post, [:subject, :content], %w(Titel Inhalt))
    assert_translated(:en, post, [:subject, :content], %w(title content))
    assert_translated(:de, post, [:subject, :content], %w(Titel Inhalt))

    post.save
    post.reload

    assert_translated(:en, post, [:subject, :content], %w(title content))
    assert_translated(:de, post, [:subject, :content], %w(Titel Inhalt))
  end

  test "attribute writers do return their argument" do
    value = Post.new.subject = 'foo'
    assert_equal 'foo', value
  end

  test "update_attribute succeeds with valid values" do
    post = Post.create(:subject => 'foo', :content => 'bar')
    post.update_attribute(:subject, 'baz')
    assert_equal 'baz', Post.first.subject
  end

  test "update_attributes fails with invalid values" do
    post = Post.create(:subject => 'foo', :content => 'bar')
    assert !post.update_attributes(:subject => '')
    assert_nil post.reload.attributes['subject']
    assert_equal 'foo', post.subject
  end

  test "passing the locale to create uses the given locale" do
    post = Post.create(:subject => 'Titel', :content => 'Inhalt', :locale => :de)
    assert_equal :en, I18n.locale
    assert_nil ActiveRecord::Base.locale

    I18n.locale = :de
    assert_equal 'Titel', post.subject
  end

  test "passing the locale to attributes= uses the given locale" do
    post = Post.create(:subject => 'title', :content => 'content')
    post.update_attributes(:subject => 'Titel', :content => 'Inhalt', :locale => :de)
    post.reload

    assert_equal :en, I18n.locale
    assert_nil ActiveRecord::Base.locale

    assert_equal 'title', post.subject
    I18n.locale = :de
    assert_equal 'Titel', post.subject
  end

  test 'reload works' do
    post = Post.create(:subject => 'foo', :content => 'bar')
    post.subject = 'baz'
    post.reload
    assert_equal 'foo', post.subject
  end

  test "returns nil if no translations are found (unsaved record)" do
    post = Post.new(:subject => 'foo')
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "returns nil if no translations are found (saved record)" do
    post = Post.create(:subject => 'foo')
    post.reload
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "finds a German post" do
    post = Post.create(:subject => 'foo (en)', :content => 'bar')
    I18n.locale = :de
    post = Post.first
    post.subject = 'baz (de)'
    post.save
    assert_equal 'baz (de)', Post.first.subject
    I18n.locale = :en
    assert_equal 'foo (en)', Post.first.subject
  end

  test "saves an English post and loads correctly" do
    post = Post.create(:subject => 'foo', :content => 'bar')
    assert post.save
    post = Post.first
    assert_equal 'foo', post.subject
    assert_equal 'bar', post.content
  end

  test "returns the value for the correct locale, after locale switching" do
    post = Post.create(:subject => 'foo')
    I18n.locale = :de
    post.subject = 'bar'
    post.save
    I18n.locale = :en
    post = Post.first
    assert_equal 'foo', post.subject
    I18n.locale = :de
    assert_equal 'bar', post.subject
  end

  test "returns the value for the correct locale, after locale switching, without saving" do
    post = Post.create :subject => 'foo'
    I18n.locale = :de
    post.subject = 'bar'
    I18n.locale = :en
    assert_equal 'foo', post.subject
    I18n.locale = :de
    assert_equal 'bar', post.subject
  end

  test "saves all locales, even after locale switching" do
    post = Post.new :subject => 'foo'
    I18n.locale = :de
    post.subject = 'bar'
    I18n.locale = :he
    post.subject = 'baz'
    post.save
    I18n.locale = :en
    post = Post.first
    assert_equal 'foo', post.subject
    I18n.locale = :de
    assert_equal 'bar', post.subject
    I18n.locale = :he
    assert_equal 'baz', post.subject
  end

  test "works with associations" do
    blog = Blog.create
    post1 = blog.posts.create(:subject => 'foo')

    I18n.locale = :de
    post2 = blog.posts.create(:subject => 'bar')
    assert_equal 2, blog.posts.size

    I18n.locale = :en
    assert_equal 'foo', blog.posts.first.subject
    assert_nil blog.posts.last.subject

    I18n.locale = :de
    assert_equal 'bar', blog.posts.last.subject
  end

  test "works with simple dynamic finders" do
    foo = Post.create(:subject => 'foo')
    Post.create(:subject => 'bar')
    post = Post.find_by_subject('foo')
    assert_equal foo, post
  end

  test 'change attribute on globalized model' do
    post = Post.create(:subject => 'foo', :content => 'bar')
    assert_equal [], post.changed
    post.subject = 'baz'
    assert_equal ['subject'], post.changed
    post.content = 'quux'
    assert_member 'subject', post.changed
    assert_member 'content', post.changed
  end

  test 'change attribute on globalized model after locale switching' do
    post = Post.create(:subject => 'foo', :content => 'bar')
    assert_equal [], post.changed
    post.subject = 'baz'
    I18n.locale = :de
    assert_equal ['subject'], post.changed
  end

  test 'complex writing and stashing' do
    post = Post.create(:subject => 'foo', :content => 'bar')
    post.subject = nil
    assert_nil post.subject
    assert !post.valid?
    post.subject = 'stashed_foo'
    assert_equal 'stashed_foo', post.subject
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

  test "untranslated class responds to locale" do
    assert Blog.respond_to?(:locale)
  end

  test "to ensure locales in different classes are the same" do
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
    Post.create :subject => 'foo'
    assert_equal :de, Post.first.translations.first.locale
  end

  test "attribute loading goes by content locale and not global locale" do
    post = Post.create(:subject => 'foo')
    assert_nil ActiveRecord::Base.locale

    ActiveRecord::Base.locale = :de
    assert_equal :en, I18n.locale
    post.update_attribute(:subject, 'foo [de]')
    assert_equal 'foo [de]', Post.first.subject

    ActiveRecord::Base.locale = :en
    assert_equal 'foo', Post.first.subject
  end

  test "access content locale before setting" do
    Globalize::ActiveRecord::ActMacro.class_eval "remove_class_variable(:@@locale)"
    assert_nothing_raised { ActiveRecord::Base.locale }
  end

  test "available_locales" do
    Post.locale = :de
    post = Post.create(:subject => 'foo')
    Post.locale = :es
    post.update_attribute(:subject, 'bar')
    Post.locale = :fr
    post.update_attribute(:subject, 'baz')
    assert_equal [:de, :es, :fr], post.available_locales
    assert_equal [:de, :es, :fr], Post.first.available_locales
  end

  test "saving record correctly after post-save reload" do
    reloader = Reloader.create(:content => 'foo')
    assert_equal 'foo', reloader.content
  end

  test "including translations" do
    I18n.locale = :de
    Post.create(:subject => "Foo1", :content => "Bar1")
    Post.create(:subject => "Foo2", :content => "Bar2")

    class << Post
      def translations_included
        self.all(:include => :translations)
      end
    end

    default       = Post.all.map { |x| [x.subject, x.content] }
    with_include  = Post.translations_included.map { |x| [x.subject, x.content] }
    assert_equal default, with_include
  end

  test "setting multiple translations at once with options hash" do
    Post.locale = :de
    post = Post.create(:subject => "foo1", :content => "foo1")
    Post.locale = :en
    post.update_attributes(:subject => "bar1", :content => "bar1")

    options = { :de => {:subject => "foo2", :content => "foo2"},
                :en => {:subject => "bar2", :content => "bar2"} }
    post.set_translations options
    post.reload

    assert ["bar2", "bar2"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo2", "foo2"], [post.subject, post.content]
  end

  test "setting only one translation with set_translations" do
    Post.locale = :de
    post = Post.create(:subject => "foo1", :content => "foo1")
    Post.locale = :en
    post.update_attributes(:subject => "bar1", :content => "bar1")

    options = { :en => { :subject => "bar2", :content => "bar2" } }
    post.set_translations options
    post.reload

    assert ["bar2", "bar2"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo1", "foo1"], [post.subject, post.content]
  end

  test "setting only selected attributes with set_translations" do
    Post.locale = :de
    post = Post.create(:subject => "foo1", :content => "foo1")
    Post.locale = :en
    post.update_attributes(:subject => "bar1", :content => "bar1")

    options = { :de => { :content => "foo2" }, :en => { :subject => "bar2" } }
    post.set_translations options
    post.reload

    assert ["bar2", "bar1"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo1", "foo2"], [post.subject, post.content]
  end

  test "setting invalid attributes raises ArgumentError" do
    Post.locale = :de
    post = Post.create(:subject => "foo1", :content => "foo1")
    Post.locale = :en
    post.update_attributes(:subject => "bar1", :content => "bar1")

    options = { :de => {:fake => "foo2"} }
    exception = assert_raise(ActiveRecord::UnknownAttributeError) do
      post.set_translations options
    end
    assert_equal "unknown attribute: fake", exception.message
  end

  test "reload accepting find options" do
    p = Post.create(:subject => "Foo", :content => "Bar")
    assert p.reload(:readonly => true, :lock => true)
    assert_raise(ArgumentError) { p.reload(:foo => :bar) }
  end

  test "dependent destroy of translation" do
    p = Post.create(:subject => "Foo", :content => "Bar")
    assert_equal 1, PostTranslation.count
    p.destroy
    assert_equal 0, PostTranslation.count
  end

  test "translating subclass of untranslated comment model" do
    translated_comment = TranslatedComment.create(:post => @post)
    assert_nothing_raised { translated_comment.translations }
  end

  test "modifiying translated comments works as expected" do
    I18n.locale = :en
    translated_comment = TranslatedComment.create(:post => @post, :content => 'foo')
    assert_equal 'foo', translated_comment.content

    I18n.locale = :de
    translated_comment.content = 'bar'
    assert translated_comment.save
    assert_equal 'bar', translated_comment.content

    I18n.locale = :en
    assert_equal 'foo', translated_comment.content

    assert_equal 2, translated_comment.translations.size
  end

  test "can create a proxy class for a namespaced model" do
    assert_nothing_raised do
      module Foo
        module Bar
          class Baz < ActiveRecord::Base
            translates :bumm
          end
        end
      end
    end
  end

  test "attribute translated before type cast" do
    Post.locale = :en
    post = Post.create(:subject => 'foo', :content => 'bar')
    Post.locale = :de
    post.update_attribute(:subject, "German foo")
    assert_equal 'German foo', post.subject_before_type_cast
    Post.locale = :en
    assert_equal 'foo', post.subject_before_type_cast
  end

  test "don't override existing translation class" do
    assert PostTranslation.new.respond_to?(:existing_method)
  end
  
  test "has_many and named scopes work with globalize" do
    blog = Blog.create
    assert_nothing_raised { blog.posts.foobar }
  end
end

# TODO error checking for fields that exist in main table, don't exist in
# proxy table, aren't strings or text
#
# TODO allow finding by translated attributes in conditions?
# TODO generate advanced dynamic finders?
