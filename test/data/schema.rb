ActiveRecord::Schema.define do
  create_table :blogs, :force => true do |t|
    t.string   :description
  end

  create_table :posts, :force => true do |t|
    t.references :blog
  end

  create_table :post_translations, :force => true do |t|
    t.string     :locale
    t.references :post
    t.string     :subject
    t.text       :content
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
    t.string     :subject
    t.text       :content
  end

  create_table :validatees, :force => true do |t|
  end

  create_table :validatee_translations, :force => true do |t|
    t.string     :locale
    t.references :validatee
    t.string     :string
  end
end
