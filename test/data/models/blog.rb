class Blog < ActiveRecord::Base
  has_many :posts, proc { order('posts.id ASC') }
  has_many :attachments, through: :posts
  has_many :translated_comments, through: :posts
end
