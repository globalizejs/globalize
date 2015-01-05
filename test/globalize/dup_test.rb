# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class DupTest < MiniTest::Spec

  describe 'duped translated model' do
    it 'stores translations of new record' do
      check_stored_translations(standard_post.dup)
    end

    it 'stores translations of created record' do
      dupd = saved_post.dup
      check_stored_translations(dupd)
    end

    it 'stores translations of found record' do
      check_stored_translations( Post.find(saved_post.id).dup )
    end

    it 'stores translations of record reloaded after creation' do
      check_stored_translations(saved_post.reload.dup)
    end
  end

  describe 'dup leaves original model alone' do

    it 'should not update the existing model' do
      original = saved_post
      original_title = original.title

      dupd = original.dup.tap do |new_model|
        new_model.title = "Foo New Model"
      end
      original.translations.each do |translation|
        dupd.translations << translation.dup
      end
      dupd.save!

      original.reload
      assert_equal "Foo New Model", dupd.title
      assert_equal original_title, original.title
    end

  end


  private

    def standard_post
      post = Post.new({:title => 'title', :content => 'content'})
      with_locale(:he) { post.title= 'שם' }
      return post
    end

    def saved_post
      standard_post.tap { |post| post.save! }
    end

    def translations_modifications(dupd)
      dupd.content = 'another content'
      with_locale(:de) { dupd.title = 'Titel' }
    end

    def translations_assertions(dupd)
      assert_translated dupd, :en, :title,   'title'               # original
      assert_translated dupd, :en, :content, 'another content'     # changed
      assert_translated dupd, :de, :title,   'Titel'               # new
      assert_translated dupd, :he, :title,    'שם'                 # untouched language
    end

    def check_stored_translations(dupd)
      translations_modifications(dupd)
      translations_assertions(dupd)
      dupd.save!
      dupd.reload
      translations_assertions(dupd)
    end

end
