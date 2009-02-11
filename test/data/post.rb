class Post < ActiveRecord::Base
  translates :subject, :content
  validates_presence_of :subject
end

class Blog < ActiveRecord::Base
  has_many :posts, :order => 'id ASC'
end

class Parent < ActiveRecord::Base
  translates :content
end

class Child < Parent
end