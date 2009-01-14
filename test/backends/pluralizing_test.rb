require File.join( File.dirname(__FILE__), '..', 'test_helper' )
require 'globalize/backend/pluralizing'

class PluralizingTest < ActiveSupport::TestCase
  def setup
    @backend = Globalize::Backend::Pluralizing.new
    @cz_pluralizer = lambda{|c| c == 1 ? :one : (2..4).include?(c) ? :few : :other }
  end

  test "#pluralizer returns the pluralizer for a given locale if defined" do
    assert_instance_of Proc, @backend.pluralizer(:en)
  end
  
  test "#pluralizer returns the default pluralizer if no pluralizer is defined for the given locale" do
    assert_equal @backend.pluralizer(:en), @backend.pluralizer(:de) 
  end
  
  test "#add_pluralizer allows to store a pluralizer per locale" do
    assert_nothing_raised { @backend.add_pluralizer(:cz, @cz_pluralizer) }
    assert_equal @cz_pluralizer, @backend.pluralizer(:cz) 
  end

end

class PluralizePluralizingTest < ActiveSupport::TestCase
  def setup
    @backend = Globalize::Backend::Pluralizing.new
    @cz_pluralizer = lambda{|c| c == 1 ? :one : (2..4).include?(c) ? :few : :other }
    @backend.store_translations :en, :foo => {:one => 'one en foo', :other => 'many en foos'}
    @backend.store_translations :cz, :foo => {:one => 'one cz foo', :few => 'few cz foos', :other => 'many cz foos'}
  end

  test "looks up the :one translation when count is 1" do
    assert_equal 'one en foo', @backend.translate(:en, :foo, :count => 1) 
  end

  test "looks up the :other translation when count is 2" do
    assert_equal 'many en foos', @backend.translate(:en, :foo, :count => 2) 
  end
end

class CzPluralizingTest < ActiveSupport::TestCase
  def setup
    @backend = Globalize::Backend::Pluralizing.new
    @cz_pluralizer = lambda{|c| c == 1 ? :one : (2..4).include?(c) ? :few : :other }
    @backend.store_translations :en, :foo => {:one => 'one en foo', :other => 'many en foos'}
    @backend.store_translations :cz, :foo => {:one => 'one cz foo', :few => 'few cz foos', :other => 'many cz foos'}
    @backend.add_pluralizer(:cz, @cz_pluralizer)
  end

  test "looks up the :one translation when count is 1 (:cz)" do
    assert_equal 'one cz foo', @backend.translate(:cz, :foo, :count => 1) 
  end

  test "looks up the :few translation when count is 2 (:cz)" do
    assert_equal 'few cz foos', @backend.translate(:cz, :foo, :count => 2)
  end

  test "looks up the :other translation when count is 5 (:cz)" do
    assert_equal 'many cz foos', @backend.translate(:cz, :foo, :count => 5)
  end

end
