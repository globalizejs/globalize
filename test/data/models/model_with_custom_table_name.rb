class ModelWithCustomTableName < ActiveRecord::Base
  translates :name, :table_name => :mctn_translations
end