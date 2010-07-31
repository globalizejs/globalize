require File.expand_path('../../test_helper', __FILE__)

class TranslationClassTest < Test::Unit::TestCase
  test 'translation_class returns the Translation class' do
    assert_equal Post::Translation, Post.translation_class
  end

  test 'defines a Translation class nested in the model class' do
    assert Post.const_defined?(:Translation)
  end

  test 'defines a belongs_to association' do
    assert_belongs_to Post::Translation, :post
  end

  test 'defines a reader for :locale that returns a symbol' do
    post = Post::Translation.new
    post.send(:write_attribute, 'locale', 'de')
    assert_equal :de, post.locale
  end

  test 'defines a write for :locale that writes a string' do
    post = Post::Translation.new
    post.locale = :de
    assert_equal 'de', post.read_attribute('locale')
  end
  
  test "can create a translation class for a namespaced model" do
    assert_nothing_raised do
      module Foo
        module Bar
          class Baz < ActiveRecord::Base
            translates :bumm
          end
        end
      end
    end
  end
  
  test "does not override existing translation class" do
    assert PostTranslation.new.respond_to?(:existing_method)
  end

  # TODO
  #
  # test "required_attributes don't include non-translated attributes" do
  #   validations = [
  #     stub(:name => :name, :macro => :validates_presence_of),
  #     stub(:name => :email, :macro => :validates_presence_of)
  #   ]
  #   User.expects(:reflect_on_all_validations => validations)
  #   assert_equal [:name], User.required_attributes
  # end
  
end


