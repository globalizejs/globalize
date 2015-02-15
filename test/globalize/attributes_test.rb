# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AttributesTest < MiniTest::Spec

  describe 'translated attribute reader' do
    it 'is defined for translated attributes' do
      assert Post.new.respond_to?(:title)
    end

    it 'returns the correct translation for a saved record after locale switching' do
      post = Post.create(:title => 'title')
      post.update_attributes(:title => 'Titel', :locale => :de)
      post.reload

      assert_translated post, :en, :title, 'title'
      assert_translated post, :de, :title, 'Titel'
    end

    # TODO: maybe move this somewhere else?
    it 'does not create empty translations when loaded or saved in a new locale' do
      post = Post.create(:title => 'title')
      assert_equal 1, post.translations.length
      I18n.locale = :de

      post.reload
      assert_equal 1, post.translations.length

      post.save
      assert_equal 1, post.reload.translations.length
    end

    it 'returns the correct translation for an unsaved record after locale switching' do
      post = Post.create(:title => 'title')
      with_locale(:de) { post.title = 'Titel' }

      assert_translated post, :en, :title, 'title'
      assert_translated post, :de, :title, 'Titel'
    end

    it 'returns correct translation for both saved/unsaved records while switching locales' do
      post = Post.new(:title => 'title')
      with_locale(:de) { post.title = 'Titel' }
      with_locale(:he) { post.title = 'שם' }

      assert_translated post, :de, :title, 'Titel'
      assert_translated post, :he, :title, 'שם'
      assert_translated post, :en, :title, 'title'
      assert_translated post, :he, :title, 'שם'
      assert_translated post, :de, :title, 'Titel'

      post.save
      post.reload

      assert_translated post, :de, :title, 'Titel'
      assert_translated post, :he, :title, 'שם'
      assert_translated post, :en, :title, 'title'
      assert_translated post, :he, :title, 'שם'
      assert_translated post, :de, :title, 'Titel'
    end

    it 'returns nil if no translations are found on an unsaved record' do
      post = Post.new(:title => 'foo')
      assert_equal 'foo', post.title
      assert_nil post.content
    end

    it 'returns nil if no translations are found on a saved record' do
      post = Post.create(:title => 'foo')
      post.reload
      assert_equal 'foo', post.title
      assert_nil post.content
    end

    it 'will use the current locale on Globalize or I18n if not passed any arguments' do
      with_locale(:de) do
        Post.create!(:title => 'Titel', :content => 'Inhalt')
      end
      I18n.locale = :de
      assert_equal 'Titel', Post.first.title

      I18n.locale = :en
      Globalize.locale = :de
      assert_equal 'Titel', Post.first.title
    end

    it 'will use the given locale when passed a locale' do
      post = with_locale(:de) do
        Post.create!(:title => 'Titel', :content => 'Inhalt')
      end
      assert_equal 'Titel', post.title(:de)
    end
  end

  describe 'translated attribute writer' do
    it 'is defined for translated attributes' do
      assert Post.new.respond_to?(:title=)
    end

    it 'returns its argument' do
      assert_equal 'foo', Post.new.title = 'foo'
    end

    it 'only triggers save on translations once parent model is saved' do
      post = Post.new
      assert post.translations.all?(&:new_record?)

      post.title = 'something'
      assert post.translations.all?(&:new_record?)

      post.save
      assert post.translations.all?(&:persisted?)
      assert_equal 1, post.translations.length
    end

    it 'does not change untranslated value' do
      post = Post.create(:title => 'title')
      before = post.untranslated_attributes['title']
      post.title = 'changed title'
      assert_equal post.untranslated_attributes['title'], before
    end

    it 'does not remove secondary unsaved translations' do
      post = with_locale(:en) do
        post = Post.new(:translations_attributes => {
          "0" => { :locale => 'en', :title => 'title' },
          "1" => { :locale => 'it', :title => 'titolo' }
        })
        post.title = 'changed my mind'
        post
      end
      post.save!
      saved_locales = post.translations.map(&:locale)
      assert saved_locales.include? :it
    end
  end

  describe '#attribute_names' do
    it 'returns translated and regular attribute names' do
      assert_equal %w(blog_id content title), Post.new.attribute_names.sort & %w(blog_id content title)
    end
  end

  describe '#attributes' do
    it 'returns translated and regular attributes' do
      post = Post.create(:title => 'foo')
      attributes = post.attributes.slice('id', 'blog_id', 'title', 'content')
      assert_equal({ 'id' => post.id, 'blog_id' => nil, 'title' => 'foo', 'content' => nil }, attributes)
    end
  end

  describe '#write_attribute' do
    it 'returns the value for non-translated attributes' do
      user = User.create(:name => 'Max Mustermann', :email => 'max@mustermann.de')
      new_email = 'm.muster@mann.de'
      assert_equal new_email, user.write_attribute('email', new_email)
    end
  end

  describe '#translated_attribute_names' do
    it 'returns translated attribute names' do
      assert_equal [:title, :content], Post.translated_attribute_names & [:title, :content]
    end
  end

  describe '#<attr>_before_type_cast' do
    it 'works for translated attributes' do
      post = Post.create(:title => 'title')
      post.update_attributes(:title => "Titel", :locale => :de)

      with_locale(:en) { assert_equal 'title', post.title_before_type_cast }
      with_locale(:de) { assert_equal 'Titel', post.title_before_type_cast }
    end
  end

  describe 'STI model' do
    it 'saves all translations after locale switching' do
      child = Child.new(:content => 'foo')
      with_locale(:de) { child.content = 'bar' }
      with_locale(:he) { child.content = 'baz' }
      child.save
      child.reload

      assert_translated child, :en, :content, 'foo'
      assert_translated child, :de, :content, 'bar'
      assert_translated child, :he, :content, 'baz'
    end
  end

  describe 'serializable attribute' do
    it 'works with default marshalling, without data' do
      model = SerializedAttr.create
      assert_equal nil, model.meta
    end

    it 'works with default marshalling, with data' do
      data = {:foo => "bar", :whats => "up"}
      model = SerializedAttr.create(:meta => data)
      assert_equal data, model.meta
    end

    it 'works with specified marshalling, without data, rails 3.1+' do
      model = SerializedHash.new
      assert_equal Hash.new, model.meta
    end
  end

  describe '#column_for_attribute' do
    it 'delegates to translations adapter' do
      post = Post.new
      assert_equal post.globalize.send(:column_for_attribute, :title), post.column_for_attribute(:title)
    end
  end

  describe 'translation table with null:false fields without default value ' do
    it 'does not save a record with an empty required field' do
      err = assert_raises ActiveRecord::StatementInvalid do
        Artwork.create
      end
      assert_match /SQLite3::ConstraintException/, err.message
    end

    it 'saves a record with a filled required field' do
      artwork = Artwork.new
      artwork.title = "foo"
      artwork.save!
      artwork.reload

      assert_equal 1, artwork.translations.length
      assert_equal 'foo', artwork.title
    end


    it 'does not save a record with an empty required field using nested attributes' do
      err = assert_raises ActiveRecord::StatementInvalid do
        Artwork.create(:translations_attributes => {
          "0" => { :locale => 'en', :title => 'title' },
          "1" => { :locale => 'it' }
        })
      end
      assert_match /SQLite3::ConstraintException/, err.message
    end

    it 'saves a record with a filled required field using nested attributes' do
      artwork = Artwork.new(:translations_attributes => {
        "0" => { :locale => 'en', :title => 'title' },
        "1" => { :locale => 'it', :title => 'titolo' }
      })
      artwork.save!
      artwork.reload

      assert_equal 2, artwork.translations.length
      assert_equal 'title', artwork.title
      assert_equal 'titolo', artwork.title(:it)
    end
  end

end
