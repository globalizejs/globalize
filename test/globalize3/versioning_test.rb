require File.expand_path('../../test_helper', __FILE__)

class VersioningTest < Test::Unit::TestCase
  test "versions are scoped to the current Globalize locale" do
    post = Post.create!(:title => 'title v1', :content => '')
    post.update_attributes!(:title => 'title v2')
    # Creates a 'created' version, and the update
    assert_equal %w[en en], post.versions.map(&:locale)

    Globalize.with_locale(:de) {
      post.update_attributes!(:title => 'Titel v1')
      assert_equal %w[de de], post.versions.map(&:locale)
    }

    post.versions.reset # hrmmm.
    assert_equal %w[en en], post.versions.map(&:locale)
  end

  test "does not create a version for initial locale" do
    # really ?
  end

  test "reverting to an earlier version only reverts changes to the current locale" do
    post = Post.create!(:title => 'title v1', :content => '')
    post.update_attributes!(:title => 'title v2')
    post.update_attributes!(:title => 'Titel v1', :locale => :de)
    post.update_attributes!(:title => 'title v3')

    # Roll back 2 versions in default locale
    post.rollback
    post.rollback

    assert_equal 'title v1', post.title(:en)
    assert_equal 'Titel v1', post.title(:de)
  end

  test "reverting happens per locale" do
    post = Post.create!(:title => 'title v1')

    with_locale(:en) do
      post.update_attributes!(:title => 'title v2')
    end

    with_locale(:de) do
      post.update_attributes!(:title => 'Titel v1')
    end

    with_locale(:en) do
      post.update_attributes!(:title => 'title v3', :published => true)
      assert post.published?
    end

    with_locale(:de) do
      post.update_attributes!(:title => 'Titel v2')
      assert !post.published?
    end

    with_locale(:en) do
      post.rollback
      assert_equal 'title v2', post.title
      assert !post.published?

      post.rollback
      assert_equal 'title v1', post.title
      assert !post.published?
    end

    with_locale(:de) do
      post.rollback
      assert_equal 'Titel v1', post.title
      assert !post.published?
    end

    with_locale(:en) do
      assert_equal 'title v1', post.title
      assert !post.published?
    end
  end
end
