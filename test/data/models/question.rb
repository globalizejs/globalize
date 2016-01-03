class Question < ActiveRecord::Base
  translates :title, fallbacks_for_empty_translations: true
  validates :title, presence: true
end
