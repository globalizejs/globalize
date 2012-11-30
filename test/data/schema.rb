ActiveRecord::Migration.verbose = false

ActiveRecord::Schema.define do
  create_table :translations, :force => true do |t|
    t.string   :blah
  end

  create_table :blogs, :force => true do |t|
    t.string   :description
  end

  create_table :posts, :force => true do |t|
    t.references :blog
    t.boolean    :published
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

  create_table :two_attributes_migrateds, :force => true do |t|
    t.string :name
    t.string :untranslated
  end

  create_table :untranslateds, :force => true do |t|
    t.string :name
  end
  create_table :two_attributes_untranslateds, :force => true do |t|
    t.string :name
    t.string :body
  end

  create_table :validatees, :force => true do |t|
  end

  create_table :validatee_translations, :force => true do |t|
    t.references :validatee
    t.string     :locale
    t.string     :string
  end

  create_table :nested_validatees, :force => true do |t|
  end

  create_table :nested_validatee_translations, :force => true do |t|
    t.references :nested_validatee
    t.string     :locale
    t.string     :string
  end

  create_table :users, :force => true do |t|
    t.string   :email
    t.datetime :created_at
  end

  create_table :user_translations, :force => true do |t|
    t.references :user
    t.string     :locale
    t.string     :name
  end

  create_table :tasks, :force => true do |t|
    t.string   :name
    t.datetime :created_at
  end

  create_table :task_translations, :force => true do |t|
    t.references :task
    t.string     :locale
    t.string     :name
  end

  create_table :words, :force => true do |t|
    t.string :term
    t.text   :definition
    t.string :locale
  end

  create_table :word_translations, :force => true do |t|
    t.references :word
    t.string     :term
    t.text       :definition
    t.string     :locale,    :default => 'en'
  end

  create_table "versions", :force => true do |t|
    t.string   "item_type",  :null => false
    t.integer  "item_id",    :null => false
    t.string   "event",      :null => false
    t.string   "whodunnit"
    t.text     "object"
    t.string   "locale"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], :name => "index_versions_on_item_type_and_item_id"

  create_table 'UPPERCASE_TABLE_NAME', :force => true do |t|
    t.string :name
  end

  create_table :UPPERCASE_TABLE_NAME_translations, :force => true do |t|
    t.integer  'uppercase_table_name_id'
    t.string     :locale
    t.string     :name
  end

  create_table :news, :force => true do |t|
    t.string :title
  end

  create_table :news_item_translations, :force => true do |t|
    t.integer  'news_id'
    t.string     :locale
    t.string     :title
  end

  create_table :pages, :force => true do |t|
  end

  create_table :page_translations, :force => true do |t|
    t.integer    :page_id
    t.string     :locale
    t.string     :title
    t.string     :body
  end

  create_table :serialized_attrs, :force => true do |t|
    t.text       :meta
  end

  create_table :serialized_attr_translations, :force => true do |t|
    t.integer    :serialized_attr_id
    t.string     :locale
    t.text       :meta
  end

  create_table :serialized_hashes, :force => true do |t|
    t.text       :meta
  end

  create_table :serialized_hash_translations, :force => true do |t|
    t.integer    :serialized_hash_id
    t.string     :locale
    t.text       :meta
  end

  create_table :accounts, :force => true do |t|
    t.string     :business_name,  :null => false, :default => ""
    t.string     :notes, :null => false, :default => ""
  end

  create_table :account_translations, :force => true do |t|
    t.references :account
    t.string     :locale
    t.string     :business_name
    t.string     :notes
  end

  create_table :medias, :force => true do |t|
  end

  create_table :media_translations, :force => true do |t|
    t.integer :media_id
    t.string  :locale
    t.string  :title
  end
end
