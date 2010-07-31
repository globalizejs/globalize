require File.expand_path('../../test_helper', __FILE__)

class MigrationTest < Test::Unit::TestCase
  def setup
    super
    Post.drop_translation_table! if Post::Translation.table_exists?
  end

  def column(name)
    Post::Translation.columns.detect { |c| c.name == name.to_s }
  end

  test 'translations table added' do
    assert !Post::Translation.table_exists?
    assert !Post::Translation.index_exists_on?(:post_id)

    Post.create_translation_table!(:title => :string, :content => :text)

    assert Post::Translation.table_exists?
    assert Post::Translation.index_exists_on?(:post_id)

    assert_equal :string,   column(:locale).type
    assert_equal :string,   column(:title).type
    assert_equal :text,     column(:content).type
    assert_equal :integer,  column(:post_id).type
    # assert_equal :datetime, column(:created_at).type # TODO hu?
    # assert_equal :datetime, column(:updated_at).type
  end

  test 'translation table dropped' do
    assert !Post::Translation.table_exists?
    assert !Post::Translation.index_exists_on?(:post_id)

    Post.create_translation_table!(:title => :string, :content => :text)
    assert Post::Translation.table_exists?
    assert Post::Translation.index_exists_on?(:post_id)

    Post.drop_translation_table!
    assert !Post::Translation.table_exists?
    assert !Post::Translation.index_exists_on?(:post_id)
  end

  test 'exception on missing field inputs' do
    assert_raise Globalize::MigrationMissingTranslatedField do
      Post.create_translation_table!(:content => :text)
    end
  end

  test 'exception on bad input type' do
    assert_raise Globalize::BadMigrationFieldType do
      Post.create_translation_table!(:title => :string, :content => :integer)
    end
  end

  test "exception on bad input type isn't raised for untranslated fields" do
    assert_nothing_raised do
      Post.create_translation_table!(:title => :string, :content => :string, :views_count => :integer)
    end
  end

  test 'create_translation_table! should not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.create_translation_table!(:name => :string)
    end
  end

  test 'drop_translation_table! should not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.drop_translation_table!
    end
  end

  test "translation_index_name returns a readable index name when it's not longer than 50 characters" do
    assert_equal 'index_post_translations_on_post_id', Post.send(:translation_index_name)
  end

  test "translation_index_name returns a hashed index name when it's longer than 50 characters" do
    index_name = UltraLongModelNameWithoutProper.send(:translation_index_name)
    assert_match /^index_[a-z0-9]{40}$/, index_name
  end

  test 'translation table added when table has long name' do
    model = UltraLongModelNameWithoutProper
    model.create_translation_table!(:title => :string, :content => :text)

    assert model::Translation.table_exists?
    assert model::Translation.index_exists?(model.send(:translation_index_name))
  end

  test 'translation table dropped when table has long name' do
    model = UltraLongModelNameWithoutProper
    model.drop_translation_table!
    model.create_translation_table!(:title => :string, :content => :text)
    model.drop_translation_table!

    assert !model::Translation.table_exists?
    assert !model::Translation.index_exists?(:ultra_long_model_name_without_proper_id)
  end
end
