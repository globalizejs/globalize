# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class DynamicFindersTest < Test::Unit::TestCase

  Rpa = "rpa@gavdi.com"

  test "Does not break normal finders" do
    user = User.create!(:name => "name", :email => Rpa)

    assert_equal user,   User.find_by_email(user.email)
    assert_equal [user], User.find_all_by_email([user.email])

    assert_equal user, User.find_by_id_and_created_at(user.id, user.created_at)
    assert_equal user, User.find_by_id_and_email(user.id, user.email)

    assert_equal [user], User.find_all_by_id_and_created_at(user.id, user.created_at)
    assert_equal [user], User.find_all_by_id_and_email(user.id, user.email)
  end

  test "simple dynamic finders do work" do
    foo = Post.create!(:title => 'foo')
    bar = Post.create!(:title => 'bar')

    assert_equal foo, Post.find_by_title('foo')
    assert_equal bar, Post.find_by_title('bar')
    assert_nil        Post.find_by_title("non existing")

    assert_equal [foo], Post.find_all_by_title('foo')
    assert_equal [],    Post.find_all_by_title('non existing')
  end

  # https://github.com/svenfuchs/globalize3/issues#issue/5
  test "simple dynamic finders retruns results from current locale and fallbacks" do
    en, de, he = 'title', 'titel', 'שם'
    post = Post.create!(:title => en)
    post.update_attributes!(:title => de, :locale => :de)
    post.update_attributes!(:title => he, :locale => :he)

    with_locale(:en) do
      assert Post.find_by_title(en)
      assert_nil Post.find_by_title(de)
    end

    with_locale(:de) do
      assert Post.find_by_title(en)
      assert Post.find_by_title(de)
      assert_nil Post.find_by_title(he)
    end

    with_locale(:he) do
      assert Post.find_by_title(en)
      assert Post.find_by_title(he)
      assert_nil Post.find_by_title(de)
    end
    
  end

  test "simple dynamic finders do work on sti models" do
    Child.create(:content => 'foo')
    Child.create(:content => 'bar')

    assert_equal 'foo', Child.find_by_content('foo').content
    assert_equal 'foo', Child.find_all_by_content('foo').first.content
  end

  test "records returned by dynamic finders have writable attributes" do
    Post.create(:title => 'original')
    post = Post.find_by_title('original')
    post.title = 'modified'
    assert_nothing_raised(ActiveRecord::ReadOnlyRecord) do
      post.save
    end
  end

  test "respond_to? should return true for all possible dynamic finders" do
    assert Post.respond_to?(:find_by_title)
    assert Post.respond_to?(:find_all_by_title)
    assert !Post.respond_to?(:find_by_foo)
    assert !Post.respond_to?(:find_all_by_foo)
  end

end