# encoding: utf-8
require File.expand_path('../../test_helper', __FILE__)

class FirstOrCreateTest < MiniTest::Spec
  if ::ActiveRecord::VERSION::STRING >= "3.2.1"
    it 'first_or_create with translations when row exists' do
      post = Post.create(:title => 'test_title')

      assert_equal Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create, post
    end

    it 'first_or_create with translations when row does not exist' do
      post = Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create

      assert_equal 'test_title', post.title
    end

    it 'first_or_create with translated and untranslated attributes' do
      user = User.with_translations(:en).where(:email => 'foo@example.com', :user_translations => {:name => 'test_name'}).first_or_create

      assert_equal 'test_name', user.name
      assert_equal 'foo@example.com', user.email
    end
  else
    it 'model should not have first_or_create method' do
      assert_equal Post.respond_to?(:first_or_create), false
    end
  end
end
