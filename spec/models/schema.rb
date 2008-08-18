ActiveRecord::Schema.define do
  create_table :posts, :force => true do |t|
  end

  create_table :post_translations, :force => true do |t|
    t.string     :locale
    t.references :post
    t.string     :subject
    t.text       :content
  end
end
  
