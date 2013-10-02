# encoding: utf-8
require File.expand_path('../../test_helper', __FILE__)

class TranslatedAttributesQueryTest < MiniTest::Spec
  describe '.where' do
    it 'finds records with matching attribute value in translations table' do
      post = Post.create(:title => 'title 1')
      Post.create(:title => 'title 2')
      assert_equal Post.where(:title => 'title 1').load, [post]
    end

    it 'only returns translations in this locale' do
      Globalize.with_locale(:ja) { Post.create(:title => 'タイトル') }
      assert Post.where(:title => 'タイトル').empty?
    end

    it 'returns chainable relation' do
      post = Post.create(:title => 'a title', :published => true)
      Post.create(:title => 'another title', :published => false)
      assert_equal Post.where(:title => 'a title').where(:published => true).load, [post]
    end

    it 'parses translated attributes in chained relations' do
      post = Post.create(:title => 'a title', :published => true)
      Post.create(:title => 'another title', :published => false)
      assert_equal Post.all.where(:published => true).where(:title => 'a title').load, [post]
    end

    it 'can be called with no argument' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      assert_equal User.where.not(:email => 'foo@example.com').load, []
      assert_equal User.where.not(:email => 'bar@example.com').load, [user]
    end

    it 'can be called with multiple arguments' do
      user = User.create(:email => 'foo@example.com', :name => 'foo')
      assert_equal User.where("email = :email", { :email => 'foo@example.com' }).first, user
    end
  end

  describe '.find_by' do
    it 'finds first record with matching attribute value in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal Post.find_by(:title => 'title 2'), post
    end
  end

  describe '.not' do
    it 'finds records with attribute not matching condition in translations table' do
      Post.create(:title => 'title 1')
      post = Post.create(:title => 'title 2')
      assert_equal Post.where.not(:title => 'title 1').first, post
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
        assert_equal @posts[0].translations, @first.translations
      end
    end

    describe '.last' do
      it 'returns record with all translations' do
        @last = Post.where(:title => 'title').last
        assert_equal @posts[2].translations, @last.translations
      end
    end

    describe '.take' do
      it 'returns record with all translations' do
        Globalize.with_locale(:ja) { @take = Post.where(:title => 'タイトル2').take }
        assert_equal @posts[1].translations, @take.translations
      end
    end
  end
end
