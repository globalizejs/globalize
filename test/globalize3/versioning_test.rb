require File.expand_path('../../test_helper', __FILE__)

class VersioningTest < Test::Unit::TestCase
  test "versioning with vestal_versions works" do
    post = Post.create!(:title => 'title', :content => '')
    assert_equal 1, post.version

    post.update_attributes!(:title => 'changed title')
    assert_equal 2, post.version

    post.update_attributes!(:content => 'changed content')
    assert_equal 3, post.version
    
    post.revert_to!(2)
    assert_equal 4, post.version
    assert_equal 'changed title', post.title
    assert_equal '', post.content
    
    post.revert_to!(1)
    assert_equal 5, post.version
    assert_equal 'title', post.title
    assert_equal '', post.content
  end
end