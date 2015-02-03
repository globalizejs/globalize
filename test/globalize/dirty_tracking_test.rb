require File.expand_path('../../test_helper', __FILE__)

class DirtyTrackingTest < MiniTest::Spec

  describe '#changed' do
    it 'includes translated attributes in list of changed attribute keys' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = 'changed title'
      assert_equal ['title'], post.changed

      post.content = 'changed content'
      assert_includes post.changed, 'title'
      assert_includes post.changed, 'content'
    end

    # ummm ... is this actually desired behaviour? probably depends on how we use it
    it 'lists attribute changed in other locale after locale switching' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = 'changed title'
      I18n.locale = :de
      assert_equal ['title'], post.changed
    end

    it 'does not track fields with identical values' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = 'title'
      assert_equal [], post.changed

      post.title = 'changed title'
      assert_equal({ 'title' => ['title', 'changed title'] }, post.changes)

      post.title = 'doubly changed title'
      assert_equal({ 'title' => ['title', 'doubly changed title'] }, post.changes)

      post.title = 'title'
      assert_equal [], post.changed
    end

    describe 'sti model' do
      it 'works with translated attributes in current locale' do
        child = Child.create(:content => 'foo')
        assert_equal [], child.changed

        child.content = 'bar'
        assert_equal ['content'], child.changed

        child.content = 'baz'
        assert_includes child.changed, 'content'
      end

      it 'works with translated attributes after locale switching' do
        child = Child.create(:content => 'foo')
        assert_equal [], child.changed

        child.content = 'bar'
        I18n.locale = :de

        assert_equal ['content'], child.changed
      end
    end
  end

  describe '#changes' do
    it 'tracks changes in each locale' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = 'changed title'
      assert_equal({ 'title' => ['title', 'changed title'] }, post.changes)
      post.save

      I18n.locale = :de
      assert_equal nil, post.title

      post.title = 'Titel'
      assert_equal({ 'title' => [nil, 'Titel'] }, post.changes)
    end

    it 'works for blank assignment' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = ''
      assert_equal({ 'title' => ['title', ''] }, post.changes)
      post.save
    end

    it 'works for nil assignment' do
      post = Post.create(:title => 'title', :content => 'content')
      assert_equal [], post.changed

      post.title = nil
      assert_equal({ 'title' => ['title', nil] }, post.changes)
      post.save
    end
  end
end
