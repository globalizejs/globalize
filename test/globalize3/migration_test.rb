require File.expand_path('../../test_helper', __FILE__)

class MigrationTest < Test::Unit::TestCase
  def setup
    super
    Migrated.drop_translation_table! if Migrated::Translation.table_exists?
  end

  def column_type(name)
    Migrated::Translation.columns.detect { |c| c.name == name.to_s }.try(:type)
  end

  test 'translations table added' do
    assert !Migrated::Translation.table_exists?
    assert !Migrated::Translation.index_exists_on?(:migrated_id)

    Migrated.create_translation_table!(:name => :string)

    assert Migrated::Translation.table_exists?
    assert Migrated::Translation.index_exists_on?(:migrated_id)

    assert_equal :string,   column_type(:locale)
    assert_equal :string,   column_type(:name)
    assert_equal :integer,  column_type(:migrated_id)
    assert_equal :datetime, column_type(:created_at)
    assert_equal :datetime, column_type(:updated_at)
  end

  test 'translation table dropped' do
    assert !Migrated::Translation.table_exists?
    assert !Migrated::Translation.index_exists_on?(:migrated_id)

    Migrated.create_translation_table!(:name => :string)
    assert Migrated::Translation.table_exists?
    assert Migrated::Translation.index_exists_on?(:migrated_id)

    Migrated.drop_translation_table!
    assert !Migrated::Translation.table_exists?
    assert !Migrated::Translation.index_exists_on?(:migrated_id)
  end

  test 'exception on missing field inputs' do
    assert_raise Globalize::MigrationMissingTranslatedField do
      Migrated.create_translation_table!(:content => :text)
    end
  end

  test 'exception on bad input type' do
    assert_raise Globalize::BadMigrationFieldType do
      Migrated.create_translation_table!(:name => :integer)
    end
  end

  test "exception on bad input type isn't raised for untranslated fields" do
    assert_nothing_raised do
      Migrated.create_translation_table!(:name => :string)
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
    assert_equal 'index_migrated_translations_on_migrated_id', Migrated.send(:translation_index_name)
  end

  test "translation_index_name returns a hashed index name when it's longer than 50 characters" do
    index_name = UltraLongMigratedModelNameWithoutProper.send(:translation_index_name)
    assert_match /^index_[a-z0-9]{40}$/, index_name
  end

  test 'translation table added when table has long name' do
    model = UltraLongMigratedModelNameWithoutProper
    model.create_translation_table!(:name => :string)

    assert model::Translation.table_exists?
    assert model::Translation.index_exists?(model.send(:translation_index_name))
  end

  test 'translation table dropped when table has long name' do
    model = UltraLongMigratedModelNameWithoutProper
    model.drop_translation_table!
    model.create_translation_table!(:name => :string)
    model.drop_translation_table!

    assert !model::Translation.table_exists?
    assert !model::Translation.index_exists?(:ultra_long_model_name_without_proper_id)
  end
end
