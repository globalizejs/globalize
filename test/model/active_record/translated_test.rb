require File.join( File.dirname(__FILE__), '..', '..', 'test_helper' )
require 'active_record'
require 'globalize/model/active_record'

# Hook up model translation
ActiveRecord::Base.send(:include, Globalize::Model::ActiveRecord::Translated)

# Load Post model
require File.join( File.dirname(__FILE__), '..', '..', 'data', 'post' )

class TranslatedTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :'en-US'
    I18n.fallbacks.clear 
    reset_db! File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'data', 'schema.rb'))
    ActiveRecord::Base.locale = nil
  end
  
  def teardown
    I18n.fallbacks.clear 
  end

  test "modifiying translated fields" do
    post = Post.create :subject => 'foo'
    assert_equal 'foo', post.subject
    post.subject = 'bar'
    assert_equal 'bar', post.subject    
  end

  test "modifiying translated fields while switching locales" do
    post = Post.create :subject => 'foo'
    assert_equal 'foo', post.subject
    I18n.locale = :'de-DE'
    post.subject = 'bar'
    assert_equal 'bar', post.subject
    I18n.locale = :'en-US'
    assert_equal 'foo', post.subject
    I18n.locale = :'de-DE'
    post.subject = 'bar'
  end
  
  test "has post_translations" do
    post = Post.create
    assert_nothing_raised { post.globalize_translations }
  end

  test "has German post_translations" do
    I18n.locale = :de
    post = Post.create :subject => 'foo'
    assert_equal 1, post.globalize_translations.size
    I18n.locale = :en
    assert_equal 1, post.globalize_translations.size    
  end
  
  test "returns the value passed to :subject" do
    post = Post.new
    assert_equal 'foo', (post.subject = 'foo')
  end

  test "translates subject and content into en-US" do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
    assert post.save
    post.reload
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "finds a German post" do
    post = Post.create :subject => 'foo (en)', :content => 'bar'
    I18n.locale = 'de-DE'
    post = Post.first
    post.subject = 'baz (de)'
    post.save
    assert_equal 'baz (de)', Post.first.subject 
    I18n.locale = :'en-US'
    assert_equal 'foo (en)', Post.first.subject 
  end

  test "saves an English post and loads test correctly" do
    assert_nil Post.first
    post = Post.create :subject => 'foo', :content => 'bar'
    assert post.save
    post = Post.first
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "updates an attribute" do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.update_attribute :subject, 'baz'
    assert_equal 'baz', Post.first.subject 
  end

  test "update_attributes failure" do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert !post.update_attributes( { :subject => '' } )
    assert_nil post.reload.attributes['subject']
    assert_equal 'foo', post.subject        
  end
    
  test "validates presence of :subject" do
    post = Post.new
    assert !post.save

    post = Post.new :subject => 'foo'
    assert post.save
  end

  test "returns the value for the correct locale, after locale switching" do
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
  end

  test "keeping one field in new locale when other field is changed" do
    I18n.fallbacks.map 'de-DE' => [ 'en-US' ]    
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.content = 'bar'
    assert_equal 'foo', post.subject    
  end
  
  test "modifying non-required field in a new locale" do
    I18n.fallbacks.map 'de-DE' => [ 'en-US' ]    
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.content = 'bar'
    assert post.save    
  end
  
  test "returns the value for the correct locale, after locale switching, without saving" do
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    I18n.locale = 'en-US'
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
  end

  test "saves all locales, even after locale switching" do
    post = Post.new :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    I18n.locale = 'he-IL'
    post.subject = 'baz'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    assert_equal 'foo', post.subject 
    I18n.locale = 'de-DE'
    assert_equal 'bar', post.subject 
    I18n.locale = 'he-IL'
    assert_equal 'baz', post.subject 
  end

  test "resolves a simple fallback" do
    I18n.locale = 'de-DE'
    post = Post.create :subject => 'foo'
    I18n.locale = 'de'
    post.subject = 'baz'
    post.content = 'bar'
    post.save
    I18n.locale = 'de-DE'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "resolves a simple fallback without reloading" do
    I18n.locale = 'de-DE'
    post = Post.new :subject => 'foo'
    I18n.locale = 'de'
    post.subject = 'baz'
    post.content = 'bar'
    I18n.locale = 'de-DE'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "resolves a complex fallback without reloading" do
    I18n.fallbacks.map 'de' => %w(en he)
    I18n.locale = 'de'
    post = Post.new
    I18n.locale = 'en'
    post.subject = 'foo'
    I18n.locale = 'he'
    post.subject = 'baz'
    post.content = 'bar'
    I18n.locale = 'de'
    assert_equal 'foo', post.subject 
    assert_equal 'bar', post.content 
  end

  test "returns nil if no translations are found" do
    post = Post.new :subject => 'foo'
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "returns nil if no translations are found; reloaded" do
    post = Post.create :subject => 'foo'
    post = Post.first
    assert_equal 'foo', post.subject
    assert_nil post.content
  end

  test "works with associations" do
    blog = Blog.create
    post1 = blog.posts.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post2 = blog.posts.create :subject => 'bar'
    assert_equal 2, blog.posts.size
    I18n.locale = 'en-US'
    assert_equal 'foo', blog.posts.first.subject
    assert_nil blog.posts.last.subject
    I18n.locale = 'de-DE'
    assert_equal 'bar', blog.posts.last.subject
  end
  
  test "works with simple dynamic finders" do
    foo = Post.create :subject => 'foo'
    Post.create :subject => 'bar'
    post = Post.find_by_subject('foo')
    assert_equal foo, post
  end
  
  test 'change attribute on globalized model' do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal [], post.changed
    post.subject = 'baz'
    assert_equal [ 'subject' ], post.changed
    post.content = 'quux'
    assert_member 'subject', post.changed
    assert_member 'content', post.changed
  end

  test 'change attribute on globalized model after locale switching' do
    post = Post.create :subject => 'foo', :content => 'bar'
    assert_equal [], post.changed
    post.subject = 'baz'
    I18n.locale = :de
    assert_equal [ 'subject' ], post.changed
  end

  test 'fallbacks with lots of locale switching' do
    I18n.fallbacks.map :'de-DE' => [ :'en-US' ]
    post = Post.create :subject => 'foo'
    
    I18n.locale = :'de-DE'
    assert_equal 'foo', post.subject
    
    I18n.locale = :'en-US'
    post.update_attribute :subject, 'bar'
    
    I18n.locale = :'de-DE'
    assert_equal 'bar', post.subject
  end
  
  test 'reload' do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.subject = 'baz'
    assert_equal 'foo', post.reload.subject    
  end
  
  test 'complex writing and stashing' do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.subject = nil
    assert_nil post.subject
    assert !post.valid?    
  end
  
  test 'translated class locale setting' do
    assert ActiveRecord::Base.respond_to?(:locale)
    assert_equal :'en-US', I18n.locale
    assert_equal :'en-US', ActiveRecord::Base.locale
    I18n.locale = :de
    assert_equal :de, I18n.locale
    assert_equal :de, ActiveRecord::Base.locale
    ActiveRecord::Base.locale = :es
    assert_equal :de, I18n.locale
    assert_equal :es, ActiveRecord::Base.locale
    I18n.locale = :fr
    assert_equal :fr, I18n.locale
    assert_equal :es, ActiveRecord::Base.locale
  end
  
  test "untranslated class responds to locale" do
    assert Blog.respond_to?(:locale)
  end
  
  test "to ensure locales in different classes are the same" do
    ActiveRecord::Base.locale = :de
    assert_equal :de, ActiveRecord::Base.locale
    assert_equal :de, Parent.locale
    Parent.locale = :es
    assert_equal :es, ActiveRecord::Base.locale
    assert_equal :es, Parent.locale
  end
  
  test "attribute saving goes by content locale and not global locale" do
    ActiveRecord::Base.locale = :de
    assert_equal :'en-US', I18n.locale
    Post.create :subject => 'foo'
    assert_equal :de, Post.first.globalize_translations.first.locale
  end
  
  test "attribute loading goes by content locale and not global locale" do
    post = Post.create :subject => 'foo'
    assert_equal :'en-US', ActiveRecord::Base.locale
    ActiveRecord::Base.locale = :de
    assert_equal :'en-US', I18n.locale
    post.update_attribute :subject, 'foo [de]'
    assert_equal 'foo [de]', Post.first.subject    
    ActiveRecord::Base.locale = :'en-US'
    assert_equal 'foo', Post.first.subject    
  end

  test "access content locale before setting" do
    Globalize::Model::ActiveRecord::Translated::ActMethods.class_eval "remove_class_variable(:@@locale)"
    assert_nothing_raised { ActiveRecord::Base.locale }
  end
  
  test "translated_locales" do
    Post.locale = :de
    post = Post.create :subject => 'foo'
    Post.locale = :es
    post.update_attribute :subject, 'bar'
    Post.locale = :fr
    post.update_attribute :subject, 'baz'
    assert_equal [ :de, :es, :fr ], post.translated_locales
    assert_equal [ :de, :es, :fr ], Post.first.translated_locales
  end
  
  test "including globalize_translations" do
    I18n.locale = :de
    Post.create :subject => "Foo1", :content => "Bar1"
    Post.create :subject => "Foo2", :content => "Bar2"
        
    class << Post
      def tranlsations_included
        self.all(:include => :globalize_translations)
      end
    end
    
    default       = Post.all.map {|x| [x.subject, x.content]}
    with_include  = Post.tranlsations_included.map {|x| [x.subject, x.content]}
    assert_equal default, with_include
  end
  
  test "setting multiple translations at once with options hash" do
    Post.locale = :de
    post = Post.create :subject => "foo1", :content => "foo1"
    Post.locale = :en
    post.update_attributes( :subject => "bar1", :content => "bar1" )
    
    options = { :de => {:subject => "foo2", :content => "foo2"},
                :en => {:subject => "bar2", :content => "bar2"} }
    post.set_translations options
    post.reload
    
    assert ["bar2", "bar2"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo2", "foo2"], [post.subject, post.content]
  end
  
  test "setting only one translation with set_translations" do
    Post.locale = :de
    post = Post.create :subject => "foo1", :content => "foo1"
    Post.locale = :en
    post.update_attributes( :subject => "bar1", :content => "bar1" )
    
    options = { :en => {:subject => "bar2", :content => "bar2"} }
    post.set_translations options
    post.reload
    
    assert ["bar2", "bar2"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo1", "foo1"], [post.subject, post.content]
  end
  
  test "setting only selected attributes with set_translations" do
    Post.locale = :de
    post = Post.create :subject => "foo1", :content => "foo1"
    Post.locale = :en
    post.update_attributes( :subject => "bar1", :content => "bar1" )
    
    options = { :de => {:content => "foo2"}, :en => {:subject => "bar2"} }
    post.set_translations options
    post.reload
    
    assert ["bar2", "bar1"], [post.subject, post.content]
    Post.locale = :de
    assert ["foo1", "foo2"], [post.subject, post.content]
  end
  
  test "setting invalid attributes raises ArgumentError" do
    Post.locale = :de
    post = Post.create :subject => "foo1", :content => "foo1"
    Post.locale = :en
    post.update_attributes( :subject => "bar1", :content => "bar1" )
    
    options = { :de => {:fake => "foo2"} }
    exception = assert_raise(ActiveRecord::UnknownAttributeError) do
      post.set_translations options
    end
    assert_equal "unknown attribute: fake", exception.message
  end
  
  test "reload accepting find options" do
    p = Post.create :subject => "Foo", :content => "Bar"
    assert p.reload(:readonly => true, :lock => true)
    assert_raise(ArgumentError) { p.reload(:foo => :bar) }
  end
  
  test "dependent destroy of translation" do
    p = Post.create :subject => "Foo", :content => "Bar"
    assert_equal 1, PostTranslation.count
    p.destroy
    assert_equal 0, PostTranslation.count
  end
  
  test "translating subclass of untranslated comment model" do
    translated_comment = TranslatedComment.create(:post => @post)
    assert_nothing_raised { translated_comment.globalize_translations }
  end
  
  test "modifiying translated comments works as expected" do
    I18n.locale = :en
    translated_comment = TranslatedComment.create(:post => @post, :content => 'foo')
    assert_equal 'foo', translated_comment.content
    
    I18n.locale = :de
    translated_comment.content = 'bar'
    assert translated_comment.save
    assert_equal 'bar', translated_comment.content
    
    I18n.locale = :en
    assert_equal 'foo', translated_comment.content
    
    assert_equal 2, translated_comment.globalize_translations.size
  end
end

# TODO should validate_presence_of take fallbacks into account? maybe we need
#   an extra validation call, or more options for validate_presence_of.
# TODO error checking for fields that exist in main table, don't exist in
# proxy table, aren't strings or text
# 
# TODO allow finding by translated attributes in conditions?
# TODO generate advanced dynamic finders?
