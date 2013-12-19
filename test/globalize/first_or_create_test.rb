# encoding: utf-8
require File.expand_path('../../test_helper', __FILE__)

class FirstOrCreateTest < MiniTest::Spec
  describe '.first_or_create' do
    if ::ActiveRecord::VERSION::STRING >= "3.2.1"
      it 'returns first record with matching translated attribute if match found' do
        post = Post.create(:title => 'test_title')
        found_post = Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create
        assert_equal post, found_post
      end

      it 'creates new record if no record with matching translated attribute exists' do
        post = Post.with_translations(:en).where(:post_translations => {:title => 'test_title'}).first_or_create
        assert_equal 'test_title', post.title
      end

      it 'creates a new record with translated and untranslated attributes' do
        user = User.with_translations(:en).where(:email => 'foo@example.com', :user_translations => {:name => 'test_name'}).first_or_create

        assert_equal 'test_name', user.name
        assert_equal 'foo@example.com', user.email
      end
    else
      it 'does not exist' do
        assert_equal Post.respond_to?(:first_or_create), false
      end
    end
  end
end
