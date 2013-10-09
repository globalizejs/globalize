require File.expand_path('../../test_helper', __FILE__)

class TranslationClassTest < MiniTest::Spec
  it 'translation_class returns the Translation class' do
    assert_equal Post::Translation, Post.translation_class
  end

  it 'defines a Translation class nested in the model class' do
    assert Post.const_defined?(:Translation)
  end

  it 'defines a belongs_to association' do
    assert_belongs_to Post::Translation, :globalized_model
  end

  it 'defines a belongs_to association for abstracted class' do
    picture = Picture.create!(:title => "content fr", :locale => "fr")
    assert_equal picture.translations.first.globalized_model, picture
  end

  it 'defines a reader for :locale that returns a symbol' do
    post = Post::Translation.new
    post.send(:write_attribute, 'locale', 'de')
    assert_equal :de, post.locale
  end

  it 'defines a write for :locale that writes a string' do
    post = Post::Translation.new
    post.locale = :de
    assert_equal 'de', post.read_attribute('locale')
  end

  it "can create a translation class for a namespaced model" do
    module Foo
      module Bar
        class Baz < ActiveRecord::Base
          translates :bumm
        end
      end
    end
  end

  it "can create a translation class for a model with an uppercase table name" do
    UppercaseTableName.create
  end

  it "can create a translation class for model with custom table name" do
    NewsItem.create
  end

  it "does not override existing translation class" do
    assert PostTranslation.new.respond_to?(:existing_method)
  end

  it "required_attributes returns required attributes (i.e. validates_presence_of)" do
    assert_equal [:name, :email], User.required_attributes
  end

  it "required_translated_attributes do not include non-translated attributes" do
    assert_equal [:name], User.required_translated_attributes
  end

  it "valid translations must have an assoicated (non-empty) locale" do
    assert !Post::Translation.new.valid?
    assert !Post::Translation.new(:locale => nil).valid?
    assert !Post::Translation.new(:locale => '').valid?
    assert Post::Translation.new(:locale => 'de').valid?
  end
end


