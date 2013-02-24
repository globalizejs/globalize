# encoding: utf-8
require File.expand_path('../test_helper', __FILE__)

module ActiveRecord
  class Updater
    cattr_accessor :query_count do
      0
    end

    cattr_accessor :queries do
      []
    end

    FILTER = [/UPDATE/]

    def call(name, start, finish, message_id, values)
      # FIXME: this seems bad. we should probably have a better way to indicate
      # the query was cached
      unless 'CACHE' == values[:name]
        self.class.query_count += 1 if FILTER.any? { |r| values[:sql] =~ r }
        self.class.queries << values[:sql] if FILTER.any? { |r| values[:sql] =~ r }
      end
    end
  end
end

class CreateRowTest < Test::Unit::TestCase
  test "no update queries for creating row" do
    ActiveSupport::Notifications.subscribe('sql.active_record', ActiveRecord::Updater.new)
    account = Page.create!(:title => 'title v1')
    ActiveSupport::Notifications.unsubscribe('sql.active_record')
    assert_equal 0, ActiveRecord::Updater.query_count
  end
end
