require 'rubygems'
require 'test/unit'
require 'active_support'
require 'active_support/test_case'
require 'mocha'

$LOAD_PATH << File.expand_path( File.dirname(__FILE__) + '/../lib' )

class ActiveSupport::TestCase
  def reset_db!( schema = 'schema' )
    ::ActiveRecord::Migration.verbose = false   # Quiet down the migration engine
    ::ActiveRecord::Base.establish_connection({
      :adapter => 'sqlite3',
      :dbfile => ':memory:'
    })
    ::ActiveRecord::Base.silence do
      load File.expand_path(File.join(File.dirname(__FILE__), 'data', schema + '.rb'))
    end
  end
  
  def assert_member(item, arr)
    assert_block "Item #{item} is not in array #{arr}" do
      arr.member? item
    end
  end
end