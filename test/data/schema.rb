ActiveRecord::Migration.verbose = false

ActiveRecord::Schema.define do
  create_table :blogs, :force => true do |t|
    t.string   :description
  end

  create_table :posts, :force => true do |t|
    t.references :blog
    # t.boolean    :published
  end

  create_table :post_translations, :force => true do |t|
    t.string     :locale
    t.references :post
    t.string     :title
    t.text       :content
    t.boolean    :published
    t.datetime   :published_at
  end

  create_table :parents, :force => true do |t|
  end

  create_table :parent_translations, :force => true do |t|
    t.string     :locale
    t.references :parent
    t.text       :content
    t.string     :type
  end

  create_table :comments, :force => true do |t|
    t.references :post
  end

  create_table :comment_translations, :force => true do |t|
    t.string     :locale
    t.references :comment
    t.string     :title
    t.text       :content
  end

  create_table :migrateds, :force => true do |t|
    t.string :name
    t.string :untranslated
  end

  create_table :validatees, :force => true do |t|
  end

  create_table :validatee_translations, :force => true do |t|
    t.references :validatee
    t.string     :locale
    t.string     :string
  end

  create_table :users, :force => true do |t|
    t.string :email
  end

  create_table :user_translations, :force => true do |t|
    t.references :user
    t.string     :locale
    t.string     :name
  end

  create_table :versions do |t|
    t.belongs_to :versioned, :polymorphic => true
    t.belongs_to :user, :polymorphic => true
    t.string :user_name
    t.text :change_log
    t.integer :number
    t.string :tag
    t.string :locale

    t.timestamps
  end

  change_table :versions do |t|
    t.index [:versioned_id, :versioned_type]
    t.index [:user_id, :user_type]
    t.index :user_name
    t.index :number
    t.index :tag
    t.index :created_at
  end
end
