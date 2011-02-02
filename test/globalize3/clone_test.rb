# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class CloneTest < Test::Unit::TestCase

  test 'stores translations from clonned new record' do
    check_stored_translations(standard_post.clone)
  end

  test 'stores translations from clonned created record' do
    clonned = saved_post.clone
    check_stored_translations(clonned)
  end

  test 'stores translations from clonned found record' do
    check_stored_translations( Post.find(saved_post).clone )
  end

  test 'stores translations from clonned reloaded after creation record' do
    check_stored_translations(saved_post.reload.clone)
  end


  private

  
    def standard_post
      p = Post.new({:title => 'title', :content => 'content'})
      with_locale(:he) { p.title= 'שם' }
      return p
    end

    def saved_post
      standard_post.tap{|p| p.save!}
    end

    def translations_modifications(clonned)
      clonned.content = 'another content'
      with_locale(:de) { clonned.title = 'Titel' }
    end

    def translations_assertions(clonned)
      assert_translated clonned, :en, :title,   'title'               # original
      assert_translated clonned, :en, :content, 'another content'     # changed
      assert_translated clonned, :de, :title,   'Titel'               # new
      assert_translated clonned, :he, :title,    'שם'                 # untouched language
    end

    def check_stored_translations(clonned)
      translations_modifications(clonned)
      translations_assertions(clonned)
      clonned.save!
      clonned.reload
      translations_assertions(clonned)
    end
  
end