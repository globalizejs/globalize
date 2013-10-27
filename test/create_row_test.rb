# encoding: utf-8
require File.expand_path('../test_helper', __FILE__)

module ActiveRecord
  class Updater
    cattr_accessor :query_count, :queries

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

class CreateRowTest < MiniTest::Spec
  def setup
    ActiveSupport::Notifications.subscribe('sql.active_record', ActiveRecord::Updater.new)
    ActiveRecord::Updater.query_count = 0
    ActiveRecord::Updater.queries = []
  end

  def teardown
    ActiveSupport::Notifications.unsubscribe('sql.active_record')
  end

  it "does not perform update when saving with cached translation" do
    p = Page.new(:title => 'title v1')
    p.translation.title
    p.save!
    assert_equal 0, ActiveRecord::Updater.query_count
  end
end
