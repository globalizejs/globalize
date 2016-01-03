class UppercaseTableName < ActiveRecord::Base
  self.table_name = "UPPERCASE_TABLE_NAME"
  translates :name
end
