# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class FirstOrCreateTest < MiniTest::Spec
  if ::ActiveRecord::VERSION::STRING >= "3.2.1"
    def test_first_or_create_with_translations_and_when_row_exists
      post = Post.create(:title => 'test_title')

      assert_equal Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create, post
    end

    def test_first_or_create_with_translations_and_when_row_does_not_exist
      post = Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create

      assert_equal 'test_title', post.title
    end
  else
    def test_model_should_not_have_first_or_create_method
      assert_equal Post.respond_to?(:first_or_create), false
    end
  end
end
