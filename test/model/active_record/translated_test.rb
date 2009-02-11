require File.join( File.dirname(__FILE__), '..', '..', 'test_helper' )
require 'active_record'
require 'globalize/model/active_record'

# Hook up model translation
ActiveRecord::Base.send(:include, Globalize::Model::ActiveRecord::Translated)

# Load Post model
require File.join( File.dirname(__FILE__), '..', '..', 'data', 'post' )

class TranslatedTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :'en-US'
    I18n.fallbacks.clear 
    reset_db! File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'data', 'schema.rb'))
  end
  
  def teardown
    I18n.fallbacks.clear 
  end

  test "modifiying translated fields" do
    post = Post.create :subject => 'foo'
    assert_equal 'foo', post.subject
    post.subject = 'bar'
    assert_equal 'bar', post.subject    
  end

  test "modifiying translated fields while switching locales" do
    post = Post.create :subject => 'foo'
    assert_equal 'foo', post.subject
    I18n.locale = :'de-DE'
    post.subject = 'bar'
    assert_equal 'bar', post.subject
    I18n.locale = :'en-US'
    assert_equal 'foo', post.subject
    I18n.locale = :'de-DE'
    post.subject = 'bar'
  end
  
  test "has post_translations" do
    post = Post.create
    assert_nothing_raised { post.globalize_translations }
  end

  test "has German post_translations" do
    I18n.locale = :de
    post = Post.create :subject => 'foo'
    assert_equal 1, post.globalize_translations.size
    I18n.locale = :en
    assert_equal 1, post.globalize_translations.size    
  end
  
  test "returns the value passed to :subject" do
    post = Post.new
    assert_equal 'foo', (post.subject = 'foo')
  end

  test "translates subject and content into en-US" do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
    assert post.save
    post.reload
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "finds a German post" do
    post = Post.create :subject => 'foo (en)', :content => 'bar'
    I18n.locale = 'de-DE'
    post = Post.first
    post.subject = 'baz (de)'
    post.save
    assert_equal 'baz (de)', Post.first.subject 
    I18n.locale = :'en-US'
    assert_equal 'foo (en)', Post.first.subject 
  end

  test "saves an English post and loads test correctly" do
    assert_nil Post.first
    post = Post.create :subject => 'foo', :content => 'bar'
    assert post.save
    post = Post.first
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "updates an attribute" do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.update_attribute :subject, 'baz'
    assert_equal 'baz', Post.first.subject 
  end

  test "validates presence of :subject" do
    post = Post.new
    assert !post.save

    post = Post.new :subject => 'foo'
    assert post.save
  end

  test "returns the value for the correct locale, after locale switching" do
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
  end

  test "keeping one field in new locale when other field is changed" do
    I18n.fallbacks.map 'de-DE' => [ 'en-US' ]    
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.content = 'bar'
    assert_equal 'foo', post.subject    
  end
  
  test "modifying non-required field in a new locale" do
    I18n.fallbacks.map 'de-DE' => [ 'en-US' ]    
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.content = 'bar'
    assert post.save    
  end
  
  test "returns the value for the correct locale, after locale switching, without saving" do
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    I18n.locale = 'en-US'
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
  end

  test "saves all locales, even after locale switching" do
    post = Post.new :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    I18n.locale = 'he-IL'
    post.subject = 'baz'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
    I18n.locale = 'he-IL'
    assert_equal 'baz', post.subject 
  end

  test "resolves a simple fallback" do
    I18n.locale = 'de-DE'
    post = Post.create :subject => 'foo'
    I18n.locale = 'de'
    post.subject = 'baz'
    post.content = 'bar'
    post.save
    I18n.locale = 'de-DE'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "resolves a simple fallback without reloading" do
    I18n.locale = 'de-DE'
    post = Post.new :subject => 'foo'
    I18n.locale = 'de'
    post.subject = 'baz'
    post.content = 'bar'
    I18n.locale = 'de-DE'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "resolves a complex fallback without reloading" do
    I18n.fallbacks.map 'de' => %w(en he)
    I18n.locale = 'de'
    post = Post.new
    I18n.locale = 'en'
    post.subject = 'foo'
    I18n.locale = 'he'
    post.subject = 'baz'
    post.content = 'bar'
    I18n.locale = 'de'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "returns nil if no translations are found" do
    post = Post.new :subject => 'foo'
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "returns nil if no translations are found; reloaded" do
    post = Post.create :subject => 'foo'
    post = Post.first
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "works with associations" do
    blog = Blog.create
    post1 = blog.posts.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post2 = blog.posts.create :subject => 'bar'
    assert_equal 2, blog.posts.size
    I18n.locale = 'en-US'
    assert_equal 'foo', blog.posts.first.subject
    assert_nil blog.posts.last.subject
    I18n.locale = 'de-DE'
    assert_equal 'bar', blog.posts.last.subject
  end
  
  test "works with simple dynamic finders" do
    foo = Post.create :subject => 'foo'
    Post.create :subject => 'bar'
    post = Post.find_by_subject('foo')
    assert_equal foo, post
  end
  
  test 'change attribute on globalized model' do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal [], post.changed
    post.subject = 'baz'
    assert_equal [ 'subject' ], post.changed
    post.content = 'quux'
    assert_member 'subject', post.changed
    assert_member 'content', post.changed
  end

  test 'change attribute on globalized model after locale switching' do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal [], post.changed
    post.subject = 'baz'
    I18n.locale = :de
    assert_equal [ 'subject' ], post.changed
  end

  test 'fallbacks with lots of locale switching' do
    I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
    post = Post.create :subject => 'foo'
    
    I18n.locale = :'de-DE'
    assert_equal 'foo', post.subject
    
    I18n.locale = :'en-US'
    post.update_attribute :subject, 'bar'
    
    I18n.locale = :'de-DE'
    assert_equal 'bar', post.subject
  end
end

# TODO should validate_presence_of take fallbacks into account? maybe we need
#   an extra validation call, or more options for validate_presence_of.
# TODO error checking for fields that exist in main table, don't exist in
# proxy table, aren't strings or text
# 
# TODO allow finding by translated attributes in conditions?
# TODO generate advanced dynamic finders?
