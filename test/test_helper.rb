require 'rubygems'
require 'test/unit'
require 'active_record'
require 'fileutils'
require 'logger'
require 'database_cleaner'
require 'mocha'
require 'pathname_local'
require 'test_declarative'
require 'ruby-debug'

$:.unshift Pathname.local('../lib').to_s
require 'globalize'

log = '/tmp/globalize3_test.log'
FileUtils.touch(log) unless File.exists?(log)
ActiveRecord::Base.logger = Logger.new(log)
ActiveRecord::LogSubscriber.attach_to(:active_record)
ActiveRecord::Base.establish_connection(:adapter => 'sqlite3', :database => ':memory:')

require Pathname.local('data/schema')
require Pathname.local('data/models')

DatabaseCleaner.strategy = :truncation

class Test::Unit::TestCase
  def setup
    I18n.locale = :en
    ActiveRecord::Base.locale = nil
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end
  
  def with_locale(*args, &block)
    I18n.with_locale(*args, &block)
  end
  
  def assert_included(item, array)
    assert_block "Item #{item.inspect} is not included in the array #{array.inspect}" do
      array.include?(item)
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

  def assert_translated(record, locale, attributes, translations)
    I18n.locale = locale
    assert_equal Array(translations), Array(attributes).map { |name| record.send(name) }
  end
end

ActiveRecord::Base.class_eval do
  class << self
    def index_exists?(index_name)
      connection.indexes(table_name).any? { |index| index.name == index_name.to_s }
    end

    def index_exists_on?(column_name)
      connection.indexes(table_name).any? { |index| index.columns == [column_name.to_s] }
    end
  end
end