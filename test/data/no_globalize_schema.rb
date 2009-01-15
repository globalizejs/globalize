ActiveRecord::Schema.define do
  
  create_table :blogs, :force => true do |t|
  end

  create_table :posts, :force => true do |t|
    t.references :blog
  end

end
  
