$LOAD_PATH << File.expand_path( File.dirname(__FILE__) + '/../lib' )

require 'rubygems'
require 'test/unit'
require 'active_record'
require 'active_support'
require 'active_support/test_case'
require 'mocha'
require 'globalize'
require 'validation_reflection'

config = { :adapter => 'sqlite3', :database => ':memory:' }
ActiveRecord::Base.establish_connection(config)

class ActiveSupport::TestCase
  def reset_db!(schema_path = nil)
    schema_path ||= File.expand_path(File.dirname(__FILE__) + '/data/schema.rb')
    ActiveRecord::Migration.verbose = false
    ActiveRecord::Base.silence { load(schema_path) }
  end

  def assert_member(item, array)
    assert_block "Item #{item} is not in array #{array}" do
      array.member?(item)
    end
  end

  def assert_belongs_to(model, associated)
    assert model.reflect_on_all_associations(:belongs_to).detect { |association|
      association.name.to_s == associated.to_s
    }
  end

  def assert_has_many(model, associated)
    assert model.reflect_on_all_associations(:has_many).detect { |association|
      association.name.to_s == associated.to_s
    }
  end
end

module ActiveRecord
  module ConnectionAdapters
    class AbstractAdapter
      def index_exists?(table_name, column_name)
        indexes(table_name).any? { |index| index.name == index_name(table_name, column_name) }
      end
    end
  end
end

# module ActiveRecord
#   class BaseWithoutTable < Base
#     self.abstract_class = true
#
#     def create_or_update
#       errors.empty?
#     end
#
#     class << self
#       def columns()
#         @columns ||= []
#       end
#
#       def column(name, sql_type = nil, default = nil, null = true)
#         columns << ActiveRecord::ConnectionAdapters::Column.new(name.to_s, default, sql_type.to_s, null)
#         reset_column_information
#       end
#
#       # Do not reset @columns
#       def reset_column_information
#         read_methods.each { |name| undef_method(name) }
#         @column_names = @columns_hash = @content_columns = @dynamic_methods_hash = @read_methods = nil
#       end
#     end
#   end
# end