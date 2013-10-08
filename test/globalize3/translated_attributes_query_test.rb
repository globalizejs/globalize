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

    it 'only returns translations in this locale' do
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
  end

  describe '.find_by' do
    it 'finds first record with matching attribute value in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal post, Post.find_by(:title => 'title 2')
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
  end

  describe '.exists?' do
    it 'returns true if record has attribute with matching value in translations table' do
      Post.create(:title => 'title 1')
      assert Post.exists?(:title => 'title 1')
      assert !Post.exists?(:title => 'title 2')
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

    describe '.first' do
      it 'returns record with all translations' do
        @first = Post.where(:title => 'title').first
        assert_equal @first.translations, @posts[0].translations
      end
    end

    describe '.last' do
      it 'returns record with all translations' do
        @last = Post.where(:title => 'title').last
        assert_equal @last.translations, @posts[2].translations
      end
    end

    describe '.take' do
      it 'returns record with all translations' do
        Globalize.with_locale(:ja) { @take = Post.where(:title => 'タイトル2').take }
        assert_equal @take.translations, @posts[1].translations
      end
    end
  end
end
