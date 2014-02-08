# encoding: utf-8
require File.expand_path('../../test_helper', __FILE__)

class TranslatedAttributesQueryTest < MiniTest::Spec
  describe '.where' do
    it 'finds records with matching attribute value in translations table' do
      post = Post.create(:title => 'title 1')
      Post.create(:title => 'title 2')
      assert_equal [post], Post.where(:title => 'title 1').load
    end

    it 'handles string-valued attributes' do
      post = Post.create(:title => 'title 1')
      Post.create(:title => 'title 2')
      assert_equal [post], Post.where('title' => 'title 1').load
    end

    it 'returns translations in this locale by default' do
      Globalize.with_locale(:ja) { Post.create(:title => 'タイトル') }
      assert Post.where(:title => 'タイトル').empty?
    end

    it 'returns chainable relation' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      User.create(:email => 'bar@example.com', :name => 'foo')
      User.create(:email => 'foo@example.com', :name => 'baz')
      assert_equal [user], User.where(:name => 'foo').where(:email => 'foo@example.com').load
    end

    it 'parses translated attributes in chained relations' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      User.create(:email => 'bar@example.com', :name => 'foo')
      User.create(:email => 'foo@example.com', :name => 'baz')
      assert_equal [user], User.all.where(:email => 'foo@example.com').where(:name => 'foo').load
    end

    it 'does not join translations table if query contains no translated attributes' do
      assert_equal User.where(:name => 'foo').includes_values, [:translations]
      assert_equal [], User.where(:email => 'foo@example.com').includes_values
    end

    it 'can be called with no argument' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      assert_equal [], User.where.not(:email => 'foo@example.com').load
      assert_equal [user], User.where.not(:email => 'bar@example.com').load
    end

    it 'can be called with multiple arguments' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      assert_equal user, User.where("email = :email", { :email => 'foo@example.com' }).first
    end

    it 'duplicates arguments before modifying them' do
      User.where(args = { :name => 'foo' })
      assert_equal args, { :name => 'foo' }
    end
  end

  describe '.find_by' do
    it 'finds first record with matching attribute value in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal post, Post.find_by(:title => 'title 2')
    end

    it 'duplicates arguments before modifying them' do
      User.find_by(args = { :name => 'foo' })
      assert_equal args, { :name => 'foo' }
    end
  end

  describe '.find_or_create_by' do
    it 'returns first record with matching attribute value if one exists in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal post, Post.find_or_create_by(:title => 'title 2')
    end

    it 'creates record with translated attribute if no matching record exists' do
      post = Post.find_or_create_by(:title => 'title 1')
      post.reload
      assert_equal Post.first, post
      assert_equal post.title, 'title 1'
    end
  end

  describe '.not' do
    it 'finds records with attribute not matching condition in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal post, Post.where.not(:title => 'title 1').first
    end

    it 'does not join translations table if query contains no translated attributes' do
      assert_equal [:translations], User.where.not(:name => 'foo').includes_values
      assert_equal [], User.where.not(:email => 'foo@example.com').includes_values
    end

    it 'duplicates arguments before modifying them' do
      User.where.not(args = { :name => 'foo' })
      assert_equal args, { :name => 'foo' }
    end
  end

  describe '.exists?' do
    it 'returns true if record has attribute with matching value in translations table' do
      Post.create(:title => 'title 1')
      assert Post.exists?(:title => 'title 1')
      assert !Post.exists?(:title => 'title 2')
    end

    it 'duplicates arguments before modifying them' do
      User.exists?(args = { :name => 'foo' })
      assert_equal args, { :name => 'foo' }
    end
  end

  describe 'finder methods' do
    before do
      @posts = [
        Post.create(:title => 'title'),
        Post.create(:title => 'title'),
        Post.create(:title => 'title') ]
      Globalize.with_locale(:ja) do
        @posts[0].update_attributes(:title => 'タイトル1')
        @posts[1].update_attributes(:title => 'タイトル2')
        @posts[2].update_attributes(:title => 'タイトル3')
      end
    end

    it 'handles nil case' do
      assert_equal nil, Post.where(:title => 'foo').first
      assert_equal nil, Post.where(:title => 'foo').last
      assert_equal nil, Post.where(:title => 'foo').take
    end

    describe '.first' do
      it 'returns record with all translations' do
        @first = Post.where(:title => 'title').first
        assert_equal @posts[0].translations, @first.translations
      end

      it 'accepts limit argument' do
        @first = Post.where(:title => 'title').first(2)
        assert_equal [@posts[0], @posts[1]], @first
      end
    end

    describe '.last' do
      it 'returns record with all translations' do
        @last = Post.where(:title => 'title').last
        assert_equal @posts[2].translations, @last.translations
      end

      it 'accepts limit argument' do
        @last = Post.where(:title => 'title').last(2)
        assert_equal [@posts[1], @posts[2]], @last
      end
    end

    describe '.take' do
      it 'returns record with all translations' do
        Globalize.with_locale(:ja) { @take = Post.where(:title => 'タイトル2').take }
        assert_equal @take.translations, @posts[1].translations
      end

      it 'accepts limit argument' do
        @take = Post.where(:title => 'title').take(2)
        assert_equal 2, @take.size
      end
    end
  end

  describe '.where_values_hash' do
    it 'includes translated attributes' do
      # when translated attribute query passed in as attribute on association
      wheres = User.with_translations(:en).where(:email => 'foo@example.com', :user_translations => {'name' => 'test_name'}).where_values_hash
      assert_equal({ 'email' => 'foo@example.com', 'locale' => 'en', 'name' => 'test_name' }, wheres)

      # when translated attribute query passed in as attribute on parent model
      wheres = User.with_translations(:en).where(:email => 'foo@example.com', :name => 'test_name').where_values_hash
      assert_equal({ 'email' => 'foo@example.com', 'locale' => 'en', 'name' => 'test_name' }, wheres)
    end
  end

  describe 'fallbacks' do
    def setup
      @previous_backend = I18n.backend
      I18n.pretend_fallbacks
      I18n.backend = BackendWithFallbacks.new

      I18n.locale = :en
      I18n.fallbacks = ::I18n::Locale::Fallbacks.new
      I18n.fallbacks.map('en' => [ 'ja' ])
    end

    def teardown
      I18n.fallbacks.clear
      I18n.hide_fallbacks
      I18n.backend = @previous_backend
    end

    it 'returns translations in fallback locales' do
      post = Post.create(:title => 'a title')
      Globalize.with_locale(:ja) { post.update_attributes :title => 'タイトル' }
      Globalize.with_locale(:fr) { post.update_attributes :title => 'titre' }

      # where
      assert_equal post, Post.where(:title => 'タイトル').first
      assert Post.where(:title => 'titre').empty?

      # find_by
      assert_equal post, Post.find_by(:title  => 'タイトル')
      assert_equal nil, Post.find_by(:title => 'titre')

      # exists
      assert Post.exists?(:title => 'タイトル')
      assert !Post.exists?(:title => 'titre')
    end
  end

  describe 'associations' do
    it 'finds records with matching attribute value in translations table' do
      blog = Blog.create
      post = blog.posts.create(:title => 'a title')
      blog.posts.create(:title => 'another title')
      assert_equal [post], blog.posts.where(:title => 'a title').load

      comment = post.translated_comments.create(content: "something")
      post.translated_comments.create(content: "something else")
      assert_equal [comment], post.translated_comments.where(content: "something").load
      assert_equal [comment], blog.translated_comments.where(content: "something").load
    end

    it 'parses translated attributes in chained relations' do
      blog = Blog.create
      post = blog.posts.create(:title => 'a title', :content => 'foo')
      blog.posts.create(:title => 'a title', :content => 'bar')
      result = blog.posts.where(:content => 'foo').where(:title => 'a title').load
      assert_equal [post], result
    end

    it 'finds records that are not translated' do
      blog = Blog.create
      post = blog.posts.create(:title => 'a title')
      attachment = post.attachments.create(file_type: "image")
      assert_equal attachment, post.attachments.where(file_type: "image").first
      assert_equal attachment, blog.attachments.where(file_type: "image").first
    end
  end
end
