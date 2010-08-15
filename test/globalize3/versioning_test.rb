require File.expand_path('../../test_helper', __FILE__)

class VersioningTest < Test::Unit::TestCase
  test "versions are scoped to the current Globalize locale" do
    post = Post.create!(:title => 'title v1', :content => '')
    post.update_attributes!(:title => 'title v2')
    assert_equal ['en'], post.versions.map(&:locale)

    Globalize.locale = :de
    post.update_attributes!(:title => 'Titel v1')
    assert_equal ['de'], post.versions.map(&:locale)

    Globalize.locale = :en
    post.versions.reset # hrmmm.
    assert_equal ['en'], post.versions.map(&:locale)
  end

  test "does not create a version for initial locale" do
    # really ?
  end

  test "reverting to an earlier version only reverts changes to the current locale" do
    post = Post.create!(:title => 'title v1', :content => '')
    post.update_attributes!(:title => 'title v2')
    post.update_attributes!(:title => 'Titel v1', :locale => :de)
    post.update_attributes!(:title => 'title v3')

    post.revert_to!(1)

    assert_equal 'title v1', post.title(:en)
    assert_equal 'Titel v1', post.title(:de)
  end

  test "versions are numbered per locale" do
    post = Post.create!(:title => 'title v1', :locale => :en)
    post.update_attributes!(:title => 'Titel v1', :locale => :de)

    assert_equal 1, with_locale(:en) { post.version }
    assert_equal 2, with_locale(:de) { post.version } # TODO should be 1

    post.update_attributes!(:title => 'title v2', :locale => :en)
    post.update_attributes!(:title => 'Titel v2', :locale => :de)

    assert_equal 2, with_locale(:en) { post.version }
    assert_equal 3, with_locale(:de) { post.version } # TODO should be 2
  end

  test "reverting happens per locale" do
    post = Post.create!(:title => 'title v1')

    with_locale(:en) do
      post.update_attributes!(:title => 'title v2')
      assert_equal 2, post.version
    end

    with_locale(:de) do
      post.update_attributes!(:title => 'Titel v1')
      assert_equal 2, post.version # TODO should be 1
    end

    with_locale(:en) do
      post.update_attributes!(:title => 'title v3', :published => true)
      assert_equal 3, post.version
      assert post.published?
    end

    with_locale(:de) do
      post.update_attributes!(:title => 'Titel v2')
      assert_equal 3, post.version # TODO should be 2
      assert post.published?       # TODO should be false
    end

    with_locale(:en) do
      post.revert_to!(2)
      assert_equal 'title v2', post.title
      assert !post.published?

      post.revert_to!(1)
      assert_equal 'title v1', post.title
      assert !post.published?
    end

    with_locale(:de) do
      post.revert_to!(2)
      assert_equal 'Titel v1', post.title
      assert !post.published?
    end

    with_locale(:en) do
      assert_equal 'title v1', post.title
      assert !post.published?
    end
  end

  # test "versioning with vestal_versions works (using update_attribute)" do
  #   post = Post.create!(:title => 'title', :content => '')
  #   assert_equal 1, post.version
  #
  #   assert post.update_attribute(:title, 'changed title')
  #   assert_equal 2, post.version
  # end
end