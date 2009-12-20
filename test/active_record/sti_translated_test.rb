require File.expand_path(File.dirname(__FILE__) + '/../test_helper')
require File.expand_path(File.dirname(__FILE__) + '/../data/models')

class StiTranslatedTest < ActiveSupport::TestCase
  def setup
    I18n.locale = :'en-US'
    reset_db!
  end

  test "works with simple dynamic finders" do
    foo = Child.create :content => 'foo'
    Child.create :content => 'bar'
    child = Child.find_by_content('foo')
    assert_equal foo, child
  end

  test 'change attribute on globalized model' do
    child = Child.create :content => 'foo'
    assert_equal [], child.changed
    child.content = 'bar'
    assert_equal [ 'content' ], child.changed
    child.content = 'baz'
    assert_member 'content', child.changed
  end

  test 'change attribute on globalized model after locale switching' do
    child = Child.create :content => 'foo'
    assert_equal [], child.changed
    child.content = 'bar'
    I18n.locale = :de
    assert_equal [ 'content' ], child.changed
  end

  test "saves all locales, even after locale switching" do
    child = Child.new :content => 'foo'
    I18n.locale = 'de-DE'
    child.content = 'bar'
    I18n.locale = 'he-IL'
    child.content = 'baz'
    child.save
    I18n.locale = 'en-US'
    child = Child.first
    assert_equal 'foo', child.content
    I18n.locale = 'de-DE'
    assert_equal 'bar', child.content
    I18n.locale = 'he-IL'
    assert_equal 'baz', child.content
  end
end
