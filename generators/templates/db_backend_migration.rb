class ActsAsTaggableMigration < ActiveRecord::Migration
  def self.up
    create_table :globalize_translations do |t|
      t.string :locale, :null => false
      t.string :key, :null => false
      t.string :translation
      t.timestamps
    end

# TODO: FINISH DOING MIGRATION -- stopped in the middle

    create_table :globalize_translations_map do |t|
      t.string  :key, :null => false
      t.integer :translation_id, :null => false
    end

    add_index :taggings, :tag_id
    add_index :taggings, [:taggable_id, :taggable_type]
  end

  def self.down
    drop_table :globalize_translations
    drop_table :tags
  end
end
