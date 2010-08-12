class Post < ActiveRecord::Base
  translates :title, :content
  validates_presence_of :title
  versioned
  scope :with_some_title, :conditions => { :title => 'some_title' }
end

class PostTranslation < ActiveRecord::Base
  def existing_method ; end
end

class ReloadingPost < Post
  after_create { reload }
end

class Blog < ActiveRecord::Base
  has_many :posts, :order => 'id ASC'
end


class Validatee < ActiveRecord::Base
  translates :string
end


class Parent < ActiveRecord::Base
  translates :content
end

class Child < Parent
end

class Comment < ActiveRecord::Base
  validates_presence_of :content
  belongs_to :post
end

class TranslatedComment < Comment
  translates :content
end

class User < ActiveRecord::Base
  translates :name
  validates_presence_of :name, :email
end

class Migrated < ActiveRecord::Base
  translates :name
end

class MigratedWithUltraLongModelName < ActiveRecord::Base
  translates :name
end

