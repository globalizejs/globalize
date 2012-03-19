# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class DynamicFindersTest < Test::Unit::TestCase

  test "Does not break normal finders" do
    user = User.create!(:name => "name", :email => "email@example.org")

    assert_equal user,   User.find_by_email(user.email)
    assert_equal [user], User.find_all_by_email([user.email])

    assert_equal user, User.find_by_id_and_created_at(user.id, user.created_at)
    assert_equal user, User.find_by_id_and_email(user.id, user.email)

    assert_equal [user], User.find_all_by_id_and_created_at(user.id, user.created_at)
    assert_equal [user], User.find_all_by_id_and_email(user.id, user.email)
  end

  test "Does not break find_or_initialize finders" do
    user = User.create!(:name => "Jim", :email => "email@example.org")

    new_user = User.find_or_initialize_by_name("Bob")

    assert_equal new_user.name, "Bob"
    assert_equal user, User.find_or_initialize_by_name_and_email("Jim", "email@example.org")
  end

  test "Does not break find_or_create finders" do
    user = User.create!(:name => "Jim", :email => "email@example.org")

    user_count_before = User.count
    new_user = User.find_or_create_by_name_and_email("Bob", "bob@example.org")
    assert_equal user_count_before + 1, User.count
    assert_equal new_user.name, "Bob"
    assert_equal new_user.email, "bob@example.org"

    assert_equal user, User.find_or_create_by_name("Jim")
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

    with_fallbacks do
      I18n.fallbacks = {:de => [:de, :en], :he => [:he, :en], :en => [:en]}

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

      I18n.fallbacks.clear
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

  test "records returned by dynamic finders have all translations" do
    post = Post.create(:title => 'a title')
    Globalize.with_locale(:ja) { post.update_attributes(:title => 'タイトル') }
    post_by_df = Post.find_by_title('a title')
    assert_equal post.translations, post_by_df.translations
  end

  test "responds to possible dynamic finders" do
    assert Post.respond_to?(:find_by_title)
    assert Post.respond_to?(:find_all_by_title)
    assert Post.respond_to?(:find_by_title_and_content)
    assert Post.respond_to?(:find_all_by_title_and_content)
  end

  test "does not responds to impossible dynamic finders" do
    assert ! Post.respond_to?(:find_by_foo)
    assert ! Post.respond_to?(:find_all_by_foo)
    assert ! Post.respond_to?(:find_by_title_and_foo)
    assert ! Post.respond_to?(:find_all_by_title_and_foo)
  end

end

class TwoTranslatedAttributesDynamicFindersTest < Test::Unit::TestCase

  def setup
    @title1, @title2, @content = "n1", "n2", "desc"
    @p1 = Post.create!(:title => @title1, :content => @content)
    @p2 = Post.create!(:title => @title2, :content => @content)
  end

  test "find one element by two translation columns" do
    assert_equal @p1, Post.find_by_title_and_content(@title1, @content)
    assert_equal @p2, Post.find_by_content_and_title(@content, @title2)
  end

  test "return nil for none existing values" do
    assert_nil Post.find_by_content_and_title(@content, "not exisiting")
    assert_nil Post.find_by_content_and_title("not existing", @title2)
    
    assert_nil Post.find_by_title_and_content("not exisiting", @content)
    assert_nil Post.find_by_title_and_content(@title2, "not existing")
  end

  test "find elements by two translation columns" do
    two_results = Post.find_all_by_title_and_content([@title1, @title2], @content)
    assert two_results.include?(@p1)
    assert two_results.include?(@p2)

    assert_equal [@p2], Post.find_all_by_content_and_title(@content, @title2)
  end

  test "returns empty result set for none existing values" do
    assert_equal [], Post.find_all_by_title_and_content([@title1, @title2], "not existing")
    assert_equal [], Post.find_all_by_title_and_content("not existing", @content)

    assert_equal [], Post.find_all_by_content_and_title(["not existing"], @title1)
    assert_equal [], Post.find_all_by_content_and_title(@content, ["not existing"])
  end

end

class TranslatedAndNormalAttributeDynamicFindersTest < Test::Unit::TestCase

  def setup
    @name1, @name2, @email = "n1", "n2", "email@example.org"
    @p1 = User.create!(:name => @name1, :email => @email)
    @p2 = User.create!(:name => @name2, :email => @email)
  end

  test "find one element by two columns" do
    assert_equal @p1, User.find_by_name_and_email(@name1, @email)
    assert_equal @p2, User.find_by_email_and_name(@email, @name2)
  end

  test "return nil for none existing values" do
    assert_nil User.find_by_email_and_name(@email, "not exisiting")
    assert_nil User.find_by_email_and_name("not existing", @name2)

    assert_nil User.find_by_name_and_email("not exisiting", @email)
    assert_nil User.find_by_name_and_email(@name2, "not existing")
  end

  test "find elements by two translation columns" do
    two_results = User.find_all_by_name_and_email([@name1, @name2], @email)
    assert two_results.include?(@p1)
    assert two_results.include?(@p2)
    assert_equal [@p2], User.find_all_by_email_and_name(@email, @name2)
  end

  test "returns empty result set for none existing values" do
    assert_equal [], User.find_all_by_name_and_email([@name1, @name2], "not existing")
    assert_equal [], User.find_all_by_name_and_email("not existing", @email)

    assert_equal [], User.find_all_by_email_and_name(["not existing"], @name1)
    assert_equal [], User.find_all_by_email_and_name(@email, ["not existing"])
  end

end
