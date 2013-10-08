class AccessorsPost < ActiveRecord::Base
  translates :title, :accessor_locales => [:en, :fr]
end
