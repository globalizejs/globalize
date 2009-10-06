require 'rubygems'
require 'test/unit'
require 'active_support'
require 'active_support/test_case'
require 'mocha'

$LOAD_PATH << File.expand_path( File.dirname(__FILE__) + '/../lib' )

class ActiveSupport::TestCase
  def reset_db!( schema_path )
    ::ActiveRecord::Migration.verbose = false   # Quiet down the migration engine
    ::ActiveRecord::Base.establish_connection({
      :adapter => 'sqlite3',
      :database => ':memory:'
    })
    ::ActiveRecord::Base.silence do
      load schema_path
    end
  end
  
  def assert_member(item, arr)
    assert_block "Item #{item} is not in array #{arr}" do
      arr.member? item
    end
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