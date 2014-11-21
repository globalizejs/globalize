require File.expand_path('../../test_helper', __FILE__)

class FallbacksTest < MiniTest::Spec
  before(:each) do
    @previous_backend = I18n.backend
    I18n.pretend_fallbacks
    I18n.backend = BackendWithFallbacks.new

    I18n.locale = :'en-US'
    I18n.fallbacks = ::I18n::Locale::Fallbacks.new
  end

  after(:each) do
    I18n.fallbacks.clear
    I18n.hide_fallbacks
    I18n.backend = @previous_backend
  end

  describe 'translated attribute reader with fallbacks' do
    it 'returns translated attribute in fallback locale when other attribute is changed' do
      I18n.fallbacks.map('de-DE' => [ 'en-US' ])
      post = Post.create :title => 'foo'

      I18n.locale = 'de-DE'
      post.content = 'bar'

      assert_equal 'foo', post.title
    end

    it 'resolves a simple fallback on a saved record' do
      I18n.locale = 'de-DE'
      post = Post.create :title => 'foo'

      I18n.locale = 'de'
      post.title = 'baz'
      post.content = 'bar'
      post.save!

      I18n.locale = 'de-DE'
      assert_equal 'foo', post.title
      assert_equal 'bar', post.content
    end

    it 'resolves a simple fallback on a new instance without reloading' do
      I18n.locale = 'de-DE'
      post = Post.new :title => 'foo'

      I18n.locale = 'de'
      post.title = 'baz'
      post.content = 'bar'

      I18n.locale = 'de-DE'
      assert_equal 'foo', post.title
      assert_equal 'bar', post.content
    end

    it 'resolves a complex fallback on a new instance without reloading' do
      I18n.fallbacks.map 'de' => %w(en he)
      I18n.locale = 'de'
      post = Post.new
      I18n.locale = 'en'
      post.title = 'foo'
      I18n.locale = 'he'
      post.title = 'baz'
      post.content = 'bar'
      I18n.locale = 'de'
      assert_equal 'foo', post.title
      assert_equal 'bar', post.content
    end

    it 'resolves fallback after lots of locale switching' do
      I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
      post = Post.create :title => 'foo'

      I18n.locale = :'de-DE'
      assert_equal 'foo', post.title

      I18n.locale = :'en-US'
      post.update_attributes(:title => 'bar')

      I18n.locale = :'de-DE'
      assert_equal 'bar', post.title
    end

    it 'resolves fallbacks with nil translations' do
      I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
      post = Post.create :title => 'foo'

      I18n.locale = :'de-DE'
      assert_equal 'foo', post.title

      post.update_attributes :title => nil
      assert_equal 'foo', post.title
    end

    it 'supports fallbacks to each other' do
      I18n.fallbacks.clear
      Globalize.fallbacks = {:en => [:en, :pl], :pl => [:pl, :en]}
      I18n.locale = :en

      en_task = Task.create(:name => 'en_text')
      assert_equal 'en_text', en_task.name

      I18n.locale = :pl

      pl_task = Task.create(:name => 'pl_text')
      assert_equal 'pl_text', pl_task.name
      assert_equal 'en_text', en_task.name

      I18n.locale = :en
      assert_equal 'pl_text', pl_task.name

      Globalize.fallbacks = nil
    end
  end

  describe 'saving model with fallbacks' do
    it 'saves after modifying non-required field in a new locale' do
      I18n.fallbacks.map 'de-DE' => [ 'en-US' ]
      post = Post.create :title => 'foo'
      I18n.locale = 'de-DE'
      post.content = 'bar'
      assert post.save
    end

    it 'creates just one translation when fallbacks set' do
      I18n.fallbacks.clear
      I18n.fallbacks.map :de => [ :fr ]
      I18n.locale = :de

      task = Task.new :name => 'foo'
      assert !task.translations.any?(&:persisted?)
      task.save

      assert_equal [:de], task.translations.map(&:locale).sort
    end
  end

  describe 'model with :fallbacks_for_empty_translations => true' do
    it 'resolves fallbacks with empty translations' do
      I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
      task = Task.create :name => 'foo'

      I18n.locale = :'de-DE'
      assert_equal 'foo', task.name

      task.update_attributes :name => ''
      assert_equal 'foo', task.name
    end
  end

  describe 'STI model' do
    it 'resolves fallbacks after lots of locale switching' do
      I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
      child = Child.create :content => 'foo'

      I18n.locale = :'de-DE'
      assert_equal 'foo', child.content

      I18n.locale = :'en-US'
      child.update_attributes(:content => 'bar')

      I18n.locale = :'de-DE'
      assert_equal 'bar', child.content
    end
  end

  describe 'model with overridden fallbacks' do
    it 'returns translated attribute in fallback locale if not set' do
      I18n.fallbacks.clear
      Task.fallbacks = [:en, :de]
      I18n.locale = :de

      task = Task.create(:name => 'foo')
      assert_equal 'foo', task.name

      I18n.locale = :en
      assert_equal 'foo', task.name
      task.name = 'bar'
      assert_equal 'bar', task.name

      I18n.locale = :fr
      assert_equal 'bar', task.name

      Task.fallbacks = nil
    end
  end

  describe '#<attr>_translations' do
    it 'does not use fallbacks' do
      I18n.fallbacks.clear
      I18n.fallbacks.map :en => [ :de ]
      I18n.locale = :en

      user = User.create(:name => 'John', :email => 'mad@max.com')
      with_locale(:de) { user.name = nil }
      assert_translated user, :en, :name, 'John'
      assert_translated user, :de, :name, 'John'

      translations = {:en => 'John', :de => nil}.stringify_keys!
      assert_equal translations, user.name_translations
    end
  end
end
# TODO should validate_presence_of take fallbacks into account? maybe we need
#   an extra validation call, or more options for validate_presence_of.
