require File.expand_path(File.dirname(__FILE__) + '/../test_helper')
require File.expand_path(File.dirname(__FILE__) + '/../data/models')

if I18n.respond_to?(:fallbacks)
  class TranslatedTest < ActiveSupport::TestCase
    def setup
      I18n.locale = :'en-US'
      I18n.fallbacks.clear
      reset_db!
      ActiveRecord::Base.locale = nil
    end

    def teardown
      I18n.fallbacks.clear
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

    test 'fallbacks with lots of locale switching' do
      I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
      child = Child.create :content => 'foo'

      I18n.locale = :'de-DE'
      assert_equal 'foo', child.content

      I18n.locale = :'en-US'
      child.update_attribute :content, 'bar'

      I18n.locale = :'de-DE'
      assert_equal 'bar', child.content
    end
  end
end

# TODO should validate_presence_of take fallbacks into account? maybe we need
#   an extra validation call, or more options for validate_presence_of.

