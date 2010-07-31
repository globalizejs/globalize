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

  test "available_locales" do
    post = Post.create!(:title => 'title', :locale => :en)
    post.update_attributes(:title => 'Title', :locale => :de)
    post.update_attributes(:title => 'titre', :locale => :fr)

    assert_equal [:de, :en, :fr], post.available_locales
    assert_equal [:de, :en, :fr], Post.first.available_locales
  end

  test "a model with an after_save callback that reloads the model still saves correctly" do
    reloading_post = ReloadingPost.create(:title => 'title')
    assert_equal 'title', reloading_post.title
    assert_translated reloading_post, :en, :title, 'title'
  end

  test "with_translations eager loads translations" do
    Post.create(:title => 'title 1')
    Post.create(:title => 'title 2')

    assert Post.with_translations.first.translations.loaded?
    assert_equal ['title 1', 'title 2'], Post.with_translations.map(&:title)
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

  # test "can create a proxy class for a namespaced model" do
  #   assert_nothing_raised do
  #     module Foo
  #       module Bar
  #         class Baz < ActiveRecord::Base
  #           translates :bumm
  #         end
  #       end
  #     end
  #   end
  # end
  #
  # test "don't override existing translation class" do
  #   assert PostTranslation.new.respond_to?(:existing_method)
  # end
  #
  #
  # test "required_attributes don't include non-translated attributes" do
  #   validations = [
  #     stub(:name => :name, :macro => :validates_presence_of),
  #     stub(:name => :email, :macro => :validates_presence_of)
  #   ]
  #   User.expects(:reflect_on_all_validations => validations)
  #   assert_equal [:name], User.required_attributes
  # end






  # test 'complex writing and stashing' do
  #   post = Post.create(:title => 'foo', :content => 'bar')
  #   post.title = nil
  #   assert_nil post.title
  #   assert !post.valid?
  #   post.title = 'stashed_foo'
  #   assert_equal 'stashed_foo', post.title
  # end

  # test 'translated class locale setting' do
  #   assert ActiveRecord::Base.respond_to?(:locale)
  #   assert_equal :en, I18n.locale
  #   assert_nil ActiveRecord::Base.locale
  #
  #   I18n.locale = :de
  #   assert_equal :de, I18n.locale
  #   assert_nil ActiveRecord::Base.locale
  #
  #   ActiveRecord::Base.locale = :es
  #   assert_equal :de, I18n.locale
  #   assert_equal :es, ActiveRecord::Base.locale
  #
  #   I18n.locale = :fr
  #   assert_equal :fr, I18n.locale
  #   assert_equal :es, ActiveRecord::Base.locale
  # end

  # test "untranslated class responds to locale" do
  #   assert Blog.respond_to?(:locale)
  # end

  # test "to ensure locales in different classes are the same" do
  #   ActiveRecord::Base.locale = :de
  #   assert_equal :de, ActiveRecord::Base.locale
  #   assert_equal :de, Parent.locale
  #
  #   Parent.locale = :es
  #   assert_equal :es, ActiveRecord::Base.locale
  #   assert_equal :es, Parent.locale
  # end

  # test "attribute saving goes by content locale and not global locale" do
  #   ActiveRecord::Base.locale = :de
  #   assert_equal :en, I18n.locale
  #   Post.create :title => 'foo'
  #   assert_equal :de, Post.first.translations.first.locale
  # end
  #
  # test "attribute loading goes by content locale and not global locale" do
  #   post = Post.create(:title => 'foo')
  #   assert_nil ActiveRecord::Base.locale
  #
  #   ActiveRecord::Base.locale = :de
  #   assert_equal :en, I18n.locale
  #   post.update_attributes(:title => 'foo [de]')
  #   assert_equal 'foo [de]', Post.first.title
  #
  #   ActiveRecord::Base.locale = :en
  #   assert_equal 'foo', Post.first.title
  # end
  #
  # test "access content locale before setting" do
  #   Globalize::ActiveRecord::ActMacro.class_eval "remove_class_variable(:@@locale)"
  #   assert_nothing_raised { ActiveRecord::Base.locale }
  # end
end