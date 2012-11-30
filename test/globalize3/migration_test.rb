require File.expand_path('../../test_helper', __FILE__)

class MigrationTest < Test::Unit::TestCase
  include Globalize::ActiveRecord::Exceptions

  def setup
    super
    reset_schema(Migrated, MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters, TwoAttributesMigrated)
    assert Migrated.translation_class.table_exists? == false
    assert Migrated.translation_class.index_exists_on?(:migrated_id) == false
    assert Migrated.translation_class.index_exists_on?(:locale) == false
  end

  def teardown
    reset_schema(Migrated, MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters, TwoAttributesMigrated)
  end

  test 'create_translation_table!(:name => :text) adds the translations table' do
    Migrated.create_translation_table!(:name => :text)
    assert_migration_table(:name => :text)
  end

  test 'create_translation_table! adds the translations table using the column type from the translated model' do
    Migrated.create_translation_table!
    assert_migration_table(:name => :string)
  end

  test 'create_translation_table! can not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.create_translation_table!(:name => :string)
    end
  end

  test "create_translation_table!(:name => {:type => :test, :default => '123'}) adds the translations table with options" do
    Migrated.create_translation_table!(:name => {:type => :text, :default => '123'})
    assert_migration_table(:name => :text)
    assert_equal column_default(:name), '123'
  end

  test 'passing a non-translated field name raises BadFieldName' do
    assert_raise BadFieldName do
      Migrated.create_translation_table!(:content => :text)
    end
  end

  test 'passing a translated field with a wrong type raises BadFieldType' do
    assert_raise BadFieldType do
      Migrated.create_translation_table!(:name => :integer)
    end
  end

  test 'setting the fields to translate we avoid creating all the translated attributes' do
    TwoAttributesMigrated.create_translation_table!(:name => :string)
    assert_migration_table({:name => :string}, TwoAttributesMigrated)
    assert_nil column_type(:body, TwoAttributesMigrated)
  end

  test 'adding fields to translate after creating the translation table' do
    TwoAttributesMigrated.create_translation_table!(:name => :string)
    TwoAttributesMigrated.add_translation_fields!(:body => :text)
    assert_migration_table({:name => :string, :body => :text}, TwoAttributesMigrated)
  end

  test 'drop_translation_table! drops the translations table' do
    Migrated.create_translation_table!(:name => :string)
    assert Migrated.translation_class.table_exists?
    assert Migrated.translation_class.index_exists_on?(:migrated_id)
    assert Migrated.translation_class.index_exists_on?(:locale)

    Migrated.drop_translation_table!
    assert !Migrated.translation_class.table_exists?
    assert !Migrated.translation_class.index_exists_on?(:migrated_id)
    assert !Migrated.translation_class.index_exists_on?(:locale)
  end

  test 'drop_translation_table! can not be called on non-translated models' do
    assert_raise NoMethodError do
      Blog.drop_translation_table!
    end
  end

  test "translation_index_name returns a readable index name if it's not longer than 64 characters" do
    assert_equal 'index_migrated_translations_on_migrated_id', Migrated.send(:translation_index_name)
  end

  test "translation_index_name returns a hashed index name if it's longer than 64 characters" do
    assert_match /^index_[a-z0-9]{40}$/, MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters.send(:translation_index_name)
  end

  test "translation_locale_index_name returns a readable index name if it's not longer than 64 characters" do
    assert_equal 'index_migrated_translations_on_locale', Migrated.send(:translation_locale_index_name)
  end

  test "translation_locale_index_name returns a hashed index name if it's longer than 64 characters" do
    assert_match /^index_[a-z0-9]{40}$/, MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters.send(:translation_locale_index_name)
  end

  test 'create_translation_table! can deal with ultra long table names' do
    model = MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters
    model.create_translation_table!(:name => :string)

    assert model.translation_class.table_exists?
    assert model.translation_class.index_exists?(model.send(:translation_index_name))
    assert model.translation_class.index_exists?(model.send(:translation_locale_index_name))
  end

  test 'drop_translation_table! can deal with ultra long table names' do
    model = MigratedWithMegaUltraSuperLongModelNameWithMoreThenSixtyCharacters
    model.create_translation_table!(:name => :string)
    model.drop_translation_table!

    assert !model.translation_class.table_exists?
    assert !model.translation_class.index_exists?(:ultra_long_model_name_without_proper_id)
  end

  # This test is relatively exhaustive in that it tests the full stack of
  # create_translation_table! and its ability to use migrate_data to migrate
  # non translated data into the default Globalize locale.
  # We are then testing the ability of drop_translation_table! to migrate the
  # translated data from the default Globalize locale back as untranslated data.
  test 'create_translation_table! with option migrate_data set to true DOES migrate existing data AND rolls back' do
    # Ensure we have a "Fresh" version. Can't use reset_schema because it's not a translated model, yet.
    model = Untranslated
    model.drop_translation_table! if model.respond_to?(:drop_translation_table!)
    model.reset_column_information

    # First create an untranslated record
    untranslated = model.create! :name => 'Untranslated'

    # Now add translation support and migrate (also tests .untranslated_attributes)
    model.instance_eval %{ translates :name }
    model.create_translation_table!({:name => :string}, {:migrate_data => true})
    assert model.translation_class.table_exists?

    # Reload the untranslated record
    untranslated.reload

    # Was it migrated?
    assert_translated untranslated, :en, :name, 'Untranslated'

    # Cool, now we need to get rid of the non-translated value for the next test
    model.update_all({:name => 'No longer translated'}, :id => untranslated.id)
    untranslated.reload

    # Make sure we didn't harm the translation and that it's been set. (also tests .untranslated_attributes)
    assert_equal 'No longer translated', untranslated.untranslated_attributes['name']
    assert_translated untranslated, :en, :name, 'Untranslated'

    # Now we need to rollback then undo
    model.drop_translation_table! :migrate_data => true
    model.reset_column_information
    assert !model.translation_class.table_exists?
    untranslated.reload

    # Was it restored? (also tests .untranslated_attributes)
    assert_equal 'Untranslated', untranslated.untranslated_attributes['name']
  end

  # Here we test that adding translation fields we can use the migrate data and remouve source column options.
  # * First, we get a model with no translation and create a record,
  # * Then, we translate both fields and create translation table just for one of them migrating data
  # * Then we add the other field to the translation table, migrate data and remove the source column
  # * Finally we check that data has been migrated, we haven't overwritten the old migrated data and there's no source column
  test 'add_translation_fields! with option migrate_data set to true DOES migrate existing data but doesn\'t remove the old migrated data' do

    model = TwoAttributesUntranslated
    model.drop_translation_table! if model.respond_to?(:drop_translation_table!)
    model.reset_column_information

    untranslated_record = model.create! :name => 'Untranslated', :body => "Untranslated body"

    model.instance_eval %{ translates :name, :body }

    model.create_translation_table!({:name => :string}, {:migrate_data => true})

    untranslated_record.reload

    # We change the unstralated value so we make sure we don't overwrite the translated one when we add new fields
    model.update_all({:name => 'No longer translated'}, :id => untranslated_record.id)
    untranslated_record.reload

    model.add_translation_fields!({:body => :text}, {:migrate_data => true, :remove_source_columns => true})
    untranslated_record.reload

    assert_translated untranslated_record, :en, :name, 'Untranslated'
    assert_translated untranslated_record, :en, :body, 'Untranslated body'
    assert_nil model.columns.detect { |c| c.name == "body" }
  end

protected

  def reset_schema(*models)
    models.each do |model|
      model.reset_column_information
      model.translation_class.reset_column_information
      model.drop_translation_table! if model.translation_class.table_exists?
    end
  end

  def column_type(name, model = Migrated)
    model.translation_class.columns.detect { |c| c.name == name.to_s }.try(:type)
  end

  def column_default(name, model = Migrated)
    model.translation_class.columns.detect { |c| c.name == name.to_s }.try(:default)
  end

  def assert_migration_table(fields, model = Migrated)
    index_field = :"#{model.class_name.underscore}_id"
    assert model.translation_class.table_exists?
    assert model.translation_class.index_exists_on?(index_field)

    assert_equal :string,   column_type(:locale, model)
    assert_equal :integer,  column_type(index_field, model)
    assert_equal :datetime, column_type(:created_at, model)
    assert_equal :datetime, column_type(:updated_at, model)

    fields.each do |name, type|
      assert_equal type, column_type(name, model)
    end
  end
end
