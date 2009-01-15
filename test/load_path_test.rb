require File.join( File.dirname(__FILE__), 'test_helper' )
require 'globalize/load_path'

class LoadPathTest < ActiveSupport::TestCase
  def setup
    @plugin_dir = "#{File.dirname(__FILE__)}/.."
    @locale_dir = "#{File.dirname(__FILE__)}/data/locale"
    @load_path = Globalize::LoadPath.new
  end
  
  test "returns glob patterns for all locales and ruby + yaml files by default" do
    patterns = %w(locales/all.rb
                  locales/*.rb 
                  locales/*/**/*.rb 
                  locales/all.yml 
                  locales/*.yml
                  locales/*/**/*.yml)
    assert_equal patterns, @load_path.send(:patterns, 'locales')
  end

  test "returns the glob patterns for registered locales and extensions" do
    @load_path.locales = [:en, :de]
    @load_path.extensions = [:sql]
    patterns = %w(locales/all.sql
                  locales/en.sql
                  locales/en/**/*.sql 
                  locales/de.sql
                  locales/de/**/*.sql)
    assert_equal patterns, @load_path.send(:patterns, 'locales')
  end

  test "expands paths using yml as a default file extension" do
    @load_path << @locale_dir
    expected = %w(all.yml de-DE.yml en-US.yml en-US/module.yml fi-FI/module.yml root.yml)
    assert_equal expected, @load_path.map{|path| path.sub("#{@locale_dir}\/", '')}
  end

  test "appends new paths to the collection so earlier collected paths preceed later collected ones" do
    @load_path.locales = [:root]
    @load_path << "#{@plugin_dir}/lib/locale"
    @load_path << @locale_dir
    
    expected = %W(#{@plugin_dir}/lib/locale/root.yml 
                  #{@locale_dir}/all.yml
                  #{@locale_dir}/root.yml)
    assert_equal expected, @load_path
  end

end
