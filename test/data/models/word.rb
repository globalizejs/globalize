class Word < ActiveRecord::Base
  translates :term, :definition
end
