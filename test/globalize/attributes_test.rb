# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AttributesTest < MiniTest::Spec
  it 'defines accessors for the translated attributes' do
    post = Post.new
    assert post.respond_to?(:title)
    assert post.respond_to?(:title=)
  end

  it 'does not save translations unless saved' do
    post = Post.new
    assert post.translations.all?(&:new_record?)

    post.title = 'something'
    assert post.translations.all?(&:new_record?)

    post.save
    assert post.translations.all?(&:persisted?)
    assert_equal 1, post.translations.length
  end

  it "attribute_names returns translated and regular attribute names" do
    assert_equal %w(blog_id content title), Post.new.attribute_names.sort & %w(blog_id content title)
  end

  it "attributes returns translated and regular attributes" do
    post = Post.create(:title => 'foo')
    attributes = post.attributes.slice('id', 'blog_id', 'title', 'content')
    assert_equal({ 'id' => post.id, 'blog_id' => nil, 'title' => 'foo', 'content' => nil }, attributes)
  end

  it "write_attribute for non-translated attributes should return the value" do
    user = User.create(:name => 'Max Mustermann', :email => 'max@mustermann.de')
    new_email = 'm.muster@mann.de'
    assert_equal new_email, user.write_attribute('email', new_email)
  end

  it 'translated_attribute_names returns translated attribute names' do
    assert_equal [:title, :content], Post.translated_attribute_names & [:title, :content]
  end

  it "a translated attribute writer returns its argument" do
    assert_equal 'foo', Post.new.title = 'foo'
  end

  it "a translated attribute reader returns the correct translation for a saved record after locale switching" do
    post = Post.create(:title => 'title')
    post.update_attributes(:title => 'Titel', :locale => :de)
    post.reload

    assert_translated post, :en, :title, 'title'
    assert_translated post, :de, :title, 'Titel'
  end

  it "a translated attribute reader does not create empty translations when loaded in a new locale" do
    post = Post.create(:title => 'title')
    assert_equal 1, post.translations.length
    I18n.locale = :de

    post.reload
    assert_equal 1, post.translations.length

    post.save
    assert_equal 1, post.reload.translations.length
  end

  it "a translated attribute reader returns the correct translation for an unsaved record after locale switching" do
    post = Post.create(:title => 'title')
    with_locale(:de) { post.title = 'Titel' }

    assert_translated post, :en, :title, 'title'
    assert_translated post, :de, :title, 'Titel'
  end

  it "a translated attribute reader returns the correct translation for both saved/unsaved records while switching locales" do
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

  it "a translated attribute reader returns nil if no translations are found on an unsaved record" do
    post = Post.new(:title => 'foo')
    assert_equal 'foo', post.title
    assert_nil post.content
  end

  it "a translated attribute reader returns nil if no translations are found on a saved record" do
    post = Post.create(:title => 'foo')
    post.reload
    assert_equal 'foo', post.title
    assert_nil post.content
  end

  it "before_type_cast reader works for translated attributes" do
    post = Post.create(:title => 'title')
    post.update_attributes(:title => "Titel", :locale => :de)

    with_locale(:en) { assert_equal 'title', post.title_before_type_cast }
    with_locale(:de) { assert_equal 'Titel', post.title_before_type_cast }
  end

  it "saves all translations on an sti model after locale switching" do
    child = Child.new(:content => 'foo')
    with_locale(:de) { child.content = 'bar' }
    with_locale(:he) { child.content = 'baz' }
    child.save
    child.reload

    assert_translated child, :en, :content, 'foo'
    assert_translated child, :de, :content, 'bar'
    assert_translated child, :he, :content, 'baz'
  end

  it 'attribute reader without arguments will use the current locale on Globalize or I18n' do
    with_locale(:de) do
      Post.create!(:title => 'Titel', :content => 'Inhalt')
    end
    I18n.locale = :de
    assert_equal 'Titel', Post.first.title

    I18n.locale = :en
    Globalize.locale = :de
    assert_equal 'Titel', Post.first.title
  end

  it 'attribute reader when passed a locale will use the given locale' do
    post = with_locale(:de) do
      Post.create!(:title => 'Titel', :content => 'Inhalt')
    end
    assert_equal 'Titel', post.title(:de)
  end

  it 'modifying a translated attribute does not change the untranslated value' do
    post = Post.create(:title => 'title')
    before = post.untranslated_attributes['title']
    post.title = 'changed title'
    assert_equal post.untranslated_attributes['title'], before
  end

  it 'serializable attribute with default marshalling, without data' do
    data = nil
    model = SerializedAttr.create
    assert_equal data, model.meta
  end

  it 'serializable attribute with default marshalling, with data' do
    data = {:foo => "bar", :whats => "up"}
    model = SerializedAttr.create(:meta => data)
    assert_equal data, model.meta
  end

  it 'serializable attribute with specified marshalling, without data, rails 3.1+' do
    data = {}
    model = SerializedHash.new
    assert_equal data, model.meta
  end

  it 'modifying a translated attribute does not remove secondary unsaved translations' do
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

  it 'does not update original columns with content not in the default locale' do
    skip 'need to fix before we release 4.0.0'
    task = Task.create :name => 'Title'

    task.translated_attribute_names # this should not make the test fail, but does
    Globalize.with_locale(:de) { task.update_attributes :name => 'Titel' }

    legacy_task = LegacyTask.find(task.id)
    assert_equal 'Title', legacy_task.name
  end

  it 'updates original columns with content in the default locale' do
    task = Task.create

    I18n.locale = :de
    task.update_attributes :name => 'Neues Titel'

    I18n.locale = :en
    task.update_attributes :name => 'New Title'

    legacy_task = LegacyTask.find(task.id)
    assert_equal 'New Title', legacy_task.name

    I18n.locale = I18n.default_locale = :de
    assert_equal 'Neues Titel', task.name
    task.update_attributes :name => 'Der neueste Titel'

    assert_equal 'Der neueste Titel', legacy_task.reload.name

    I18n.locale = :en
    assert_equal 'New Title', task.name
  end

  it 'does not update original columns with content in a different locale' do
    word = Word.create :locale => 'nl', :term => 'ontvrienden', :definition => 'Iemand als vriend verwijderen op een sociaal netwerk'
    legacy_word = LegacyWord.find(word.id)
    assert_equal 'ontvrienden', legacy_word.term

    I18n.locale = :en
    word.update_attributes :term => 'unfriend', :definition => 'To remove someone as a friend on a social network'

    assert_equal 'unfriend',    word.term
    assert_equal 'ontvrienden', word.term(:nl)
    assert_equal 'ontvrienden', legacy_word.reload.term

    I18n.locale = I18n.default_locale = :de
    word.update_attributes :term => 'entfreunde', :definition => 'Um jemanden als Freund in einem sozialen Netzwerk zu entfernen'

    assert_equal 'entfreunde',  word.term
    assert_equal 'unfriend',    word.term(:en)
    assert_equal 'ontvrienden', word.term(:nl)
    assert_equal 'ontvrienden', legacy_word.reload.term
  end

  it 'updates original columns with content in the same locale' do
    word = Word.create :locale => 'nl', :term => 'ontvrienden', :definition => 'Iemand als vriend verwijderen op een sociaal netwerk'

    I18n.locale = :en
    word.update_attributes :term => 'unfriend', :definition => 'To remove someone as a friend on a social network'

    I18n.locale = :nl
    word.update_attributes :term => 'ontvriend'

    legacy_word = LegacyWord.find(word.id)
    assert_equal 'ontvriend', word.term
    assert_equal 'unfriend',  word.term(:en)
    assert_equal 'ontvriend', legacy_word.term
  end

  it 'does not change a blank attribute to nil' do
    account = Account.new
    assert_equal '', account.business_name
    assert_equal '', account.notes
  end

  it 'delegates column_for_attribute to translations adapter' do
    post = Post.new
    assert_equal post.globalize.send(:column_for_attribute, :title), post.column_for_attribute(:title)
  end
end
