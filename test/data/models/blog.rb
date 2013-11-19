class Blog < ActiveRecord::Base
  has_many :posts, proc { order('posts.id ASC') }
end
