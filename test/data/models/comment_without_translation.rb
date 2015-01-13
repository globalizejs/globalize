class CommentWithoutTranslation < ActiveRecord::Base
  self.table_name = "comments_without_translations"
  belongs_to :article
end
