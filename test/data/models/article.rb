class Article < ActiveRecord::Base
  belongs_to :author
  has_many :comments_without_translations

  translates :title
end
