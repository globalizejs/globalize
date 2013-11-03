# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class CloneTest < MiniTest::Spec

  it 'stores translations from cloned new record' do
    check_stored_translations(standard_post.clone)
  end

  it 'stores translations from cloned created record' do
    cloned = saved_post.clone
    check_stored_translations(cloned)
  end

  it 'stores translations from cloned found record' do
    check_stored_translations( Post.find(saved_post).clone )
  end

  it 'stores translations from cloned reloaded after creation record' do
    check_stored_translations(saved_post.reload.clone)
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

    def translations_modifications(cloned)
      cloned.content = 'another content'
      with_locale(:de) { cloned.title = 'Titel' }
    end

    def translations_assertions(cloned)
      assert_translated cloned, :en, :title,   'title'               # original
      assert_translated cloned, :en, :content, 'another content'     # changed
      assert_translated cloned, :de, :title,   'Titel'               # new
      assert_translated cloned, :he, :title,    'שם'                 # untouched language
    end

    def check_stored_translations(cloned)
      translations_modifications(cloned)
      translations_assertions(cloned)
      cloned.save!
      cloned.reload
      translations_assertions(cloned)
    end

end
