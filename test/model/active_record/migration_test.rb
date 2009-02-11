require File.join( File.dirname(__FILE__), '..', '..', 'test_helper' )
require 'active_record'
require 'globalize/model/active_record'

# Hook up model translation
ActiveRecord::Base.send(:include, Globalize::Model::ActiveRecord::Translated)

# Load Post model
require File.join( File.dirname(__FILE__), '..', '..', 'data', 'post' )

class MigrationTest < ActiveSupport::TestCase
  def setup
    reset_db! File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'data', 'no_globalize_schema.rb'))
  end
  
  test 'globalize table added' do
    assert !Post.connection.table_exists?( :post_translations )
    Post.create_translation_table! :subject => :string, :content => :text
    assert Post.connection.table_exists?( :post_translations )      
    columns = Post.connection.columns( :post_translations )
    assert locale = columns.detect {|c| c.name == 'locale' }
    assert_equal :string, locale.type
    assert subject = columns.detect {|c| c.name == 'subject' }
    assert_equal :string, subject.type
    assert content = columns.detect {|c| c.name == 'content' }
    assert_equal :text, content.type
    assert post_id = columns.detect {|c| c.name == 'post_id' }
    assert_equal :integer, post_id.type
    assert created_at = columns.detect {|c| c.name == 'created_at' }
    assert_equal :datetime, created_at.type
    assert updated_at = columns.detect {|c| c.name == 'updated_at' }
    assert_equal :datetime, updated_at.type
  end
  
  test 'globalize table dropped' do
    assert !Post.connection.table_exists?( :post_translations )
    Post.create_translation_table! :subject => :string, :content => :text
    assert Post.connection.table_exists?( :post_translations )      
    Post.drop_translation_table!
    assert !Post.connection.table_exists?( :post_translations )
  end

  test 'exception on untranslated field inputs' do
    assert_raise Globalize::Model::UntranslatedMigrationField do
      Post.create_translation_table! :subject => :string, :content => :text, :bogus => :string
    end
  end
  
  test 'exception on missing field inputs' do
    assert_raise Globalize::Model::MigrationMissingTranslatedField do
      Post.create_translation_table! :content => :text
    end
  end
  
  test 'exception on bad input type' do
    assert_raise Globalize::Model::BadMigrationFieldType do
      Post.create_translation_table! :subject => :string, :content => :integer
    end
  end
  
  test 'create_translation_table! should not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.create_translation_table! :name => :string      
    end
  end

  test 'drop_translation_table! should not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.drop_translation_table!      
    end
  end

end