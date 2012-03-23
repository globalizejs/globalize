# encoding: utf-8

require File.expand_path('../test_helper', __FILE__)

class Globalize3Test < Test::Unit::TestCase
  test "a translated record has many translations" do
    assert_has_many(Post, :translations)
  end

  test "translations are empty for a new record" do
    assert_equal [], Post.new.translations
  end

  test "create uses the given locale" do
    post = Post.create(:title => 'Titel', :locale => :de)
    assert_translated post, :de, :title, 'Titel'
  end

  test "can translate boolean values" do
    post = Post.create(:title => 'Titel', :published => true, :locale => :de)
    assert_translated post, :de, :published, true
  end

  test "can translate datetime values" do
    now = Time.now
    post = Post.create(:title => 'Titel', :published_at => now, :locale => :de)
    assert_translated post, :de, :published_at, now
  end

  test "attributes= uses the given locale" do
    post = Post.create(:title => 'title')
    post.attributes = { :title => 'Titel', :locale => :de }
    post.save
    post.reload

    assert_equal 2, post.translations.size
    assert_translated post, :de, :title, 'Titel'
    assert_translated post, :en, :title, 'title'
  end

  test "create on associations works" do
    blog = Blog.create
    blog.posts.create(:title => 'title')
    blog.posts.create(:title => 'Titel', :locale => :de)

    assert_equal 2, blog.posts.size
    assert_translated blog.posts.first, :en, :title, 'title'
    assert_translated blog.posts.last,  :de, :title, 'Titel'
  end

  test "named scopes work" do
    post = Blog.create.posts.create(:title => 'some title')
    post.reload

    assert_translated post, :en, :title, 'some title'
  end

  test "saves a translations record for each locale using a given locale" do
    post = Post.create(:title => 'Titel', :locale => :de)
    post.update_attributes(:title => 'title', :locale => :en)

    assert_equal 2, post.translations.size
    assert_translated post, :de, :title, 'Titel'
    assert_translated post, :en, :title, 'title'
  end

  test "saves a translations record for each locale using the current I18n locale" do
    post = with_locale(:de) { Post.create(:title => 'Titel') }
    with_locale(:en) { post.update_attributes(:title => 'title') }

    assert_equal 2, post.translations.size
    assert_translated post, :en, :title, 'title'
    assert_translated post, :de, :title, 'Titel'
  end

  test "reload works with translated attributes" do
    post = Post.create(:title => 'foo')
    post.title = 'baz'
    post.reload
    assert_equal 'foo', post.title
  end

  test "reload works with translated attributes when updated elsewhere" do
    post = Post.create(:title => 'foo')
    post.title  # make sure its fetched from the DB

    Post.find_by_id(post.id).update_attributes! :title => 'bar'

    post.reload

    assert_equal 'bar', post.title
  end

  test "reload accepts standard finder options" do
    post = Post.create(:title => "title")
    assert post.reload(:readonly => true, :lock => true)
    assert_raise(ArgumentError) { post.reload(:foo => :bar) }
  end

  test "destroy destroys dependent translations" do
    post = Post.create(:title => "title")
    post.update_attributes(:title => 'Titel', :locale => :de)
    assert_equal 2, PostTranslation.count
    post.destroy
    assert_equal 0, PostTranslation.count
  end

  test "to_xml includes translated fields" do
    post = Post.create(:title => "foo", :content => "bar")
    post.reload
    assert post.to_xml =~ %r(<title>foo</title>)
    assert post.to_xml =~ %r(<content>bar</content>)
  end

  test "to_xml doesn't affect untranslated models" do
    blog = Blog.create(:description => "my blog")
    blog.reload
    assert blog.to_xml =~ %r(<description>my blog</description>)
  end

  test "translated_locales returns locales that have translations" do
    first = Post.create!(:title => 'title', :locale => :en)
    first.update_attributes(:title => 'Title', :locale => :de)

    second = Post.create!(:title => 'title', :locale => :en)
    second.update_attributes(:title => 'titre', :locale => :fr)

    assert_equal [:de, :en, :fr], Post.translated_locales
    assert_equal [:de, :en], first.translated_locales
    assert_equal [:en, :fr], second.translated_locales

    first.reload
    second.reload

    assert_equal [:de, :en], first.translated_locales
    assert_equal [:en, :fr], second.translated_locales
  end

  test "a model with an after_save callback that reloads the model still saves correctly" do
    reloading_post = ReloadingPost.create!(:title => 'title')
    assert_equal 'title', reloading_post.title
    assert_translated reloading_post, :en, :title, 'title'
  end

  test "with_translations eager loads translations" do
    Post.create(:title => 'title 1')
    Post.create(:title => 'title 2')

    assert Post.with_translations.first.translations.loaded?
    assert_equal ['title 1', 'title 2'], Post.with_translations.map(&:title)
  end

  test "translation_for ignores with_translations scope" do
    post = with_locale(:de) { Post.create(:title => 'title de') }
    with_locale(:en) { post.update_attributes(:title => 'title en') }
    
    assert_equal 'title en', Post.with_translations(:de).first.translation_for(:en).title
  end

  test "a subclass of an untranslated model can translate attributes" do
    post = Post.create(:title => 'title')
    translated_comment = TranslatedComment.create(:post => post, :content => 'content')

    assert_nothing_raised { translated_comment.translations }
    assert_translated translated_comment, :en, :content, 'content'
  end

  test "modifiying translated attributes on a subclass of an untranslated model works" do
    post = Post.create(:title => 'title')
    translated_comment = TranslatedComment.create(:post => post, :content => 'content')

    assert translated_comment.update_attributes(:content => 'Inhalt', :locale => :de)
    assert_translated translated_comment, :en, :content, 'content'
    assert_translated translated_comment, :de, :content, 'Inhalt'
  end

  test "calling translates a second times adds the new attributes to the translated attributes" do
    page = Page.new :title => 'Wilkommen', :body => 'Ein body', :locale => :de
    assert_translated page, :de, :title, 'Wilkommen'
    assert_translated page, :de, :body, 'Ein body'
  end
end
