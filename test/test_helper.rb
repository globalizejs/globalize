require 'rubygems'
require 'bundler/setup'
require 'test/unit'
require 'fileutils'
require 'logger'

Bundler.require(:default, :test)
require 'database_cleaner'
require 'test_declarative'

log = '/tmp/globalize3_test.log'
FileUtils.touch(log) unless File.exists?(log)
ActiveRecord::Base.logger = Logger.new(log)
ActiveRecord::LogSubscriber.attach_to(:active_record)
ActiveRecord::Base.establish_connection(:adapter => 'sqlite3', :database => ':memory:')

$:.unshift File.expand_path('../../lib', __FILE__)
require 'globalize'
require 'erb'

require File.expand_path('../data/schema', __FILE__)
require File.expand_path('../data/models', __FILE__)

DatabaseCleaner.strategy = :truncation

class Test::Unit::TestCase
  def setup
    I18n.locale = :en
    Globalize.locale = nil
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end

  def with_locale(*args, &block)
    Globalize.with_locale(*args, &block)
  end

  def with_fallbacks
    previous = I18n.backend
    I18n.backend = BackendWithFallbacks.new
    I18n.pretend_fallbacks
    return yield
  ensure
    I18n.hide_fallbacks
    I18n.backend = previous
  end

  def assert_included(item, array)
    assert_block "Item #{item.inspect} is not included in the array #{array.inspect}" do
      array.include?(item)
    end
  end

  def assert_belongs_to(model, other)
    assert_association(model, :belongs_to, other)
  end

  def assert_has_many(model, other)
    assert_association(model, :has_many, other)
  end

  def assert_association(model, type, other)
    assert model.reflect_on_all_associations(type).any? { |a| a.name.to_s == other.to_s }
  end

  def assert_translated(record, locale, attributes, translations)
    assert_equal Array.wrap(translations), Array.wrap(attributes).map { |name| record.send(name, locale) }
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

class BackendWithFallbacks < I18n::Backend::Simple
  include I18n::Backend::Fallbacks
end

meta = class << I18n; self; end
meta.class_eval do
  alias_method(:alternatives, :fallbacks)

  def pretend_fallbacks
    class << I18n; self; end.send(:alias_method, :fallbacks, :alternatives)
  end

  def hide_fallbacks
    class << I18n; self; end.send(:remove_method, :fallbacks)
  end
end

I18n.hide_fallbacks
