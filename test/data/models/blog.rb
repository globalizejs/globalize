class Blog < ActiveRecord::Base
  has_many :posts, proc { order('id ASC') }
end
