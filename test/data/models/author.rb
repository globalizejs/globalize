class Author < ActiveRecord::Base
  has_many :articles
  has_many :comments_without_translations, class_name: "CommentWithoutTranslation", through: :articles
end
