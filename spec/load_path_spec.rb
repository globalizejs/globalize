require File.dirname(__FILE__) + '/spec/helper.rb'
require 'globalize/load_path'

describe Globalize::LoadPath, "#patterns" do
  before :each do
    @plugin_dir = "#{File.dirname(__FILE__)}/.."
    @locale_dir = "#{File.dirname(__FILE__)}/spec/fixtures/locale"
    @load_path = Globalize::LoadPath.new
  end
  
  it "returns glob patterns for all locales and ruby + yaml files by default" do
    patterns = %w(locales/all.rb
                  locales/*.rb 
                  locales/*/**/*.rb 
                  locales/all.yml 
                  locales/*.yml
                  locales/*/**/*.yml)
    @load_path.send(:patterns, 'locales').should == patterns
  end
  
  it "returns the glob patterns for registered locales and extensions" do
    @load_path.locales = [:en, :de]
    @load_path.extensions = [:sql]
    patterns = %w(locales/all.sql
                  locales/en.sql
                  locales/en/**/*.sql 
                  locales/de.sql
                  locales/de/**/*.sql)
    @load_path.send(:patterns, 'locales').should == patterns
  end

  it "expands paths using yml as a default file extension" do
    @load_path << @locale_dir
    expected = %w(all.yml de-DE.yml en-US.yml en-US/module.yml fi-FI/module.yml root.yml)
    @load_path.map{|path| path.sub("#{@locale_dir}\/", '')}.should == expected
  end

  it "appends new paths to the collection so earlier collected paths preceed later collected ones" do
    @load_path.locales = [:root]
    @load_path << "#{@plugin_dir}/lib/locale"
    @load_path << @locale_dir
    
    expected = %W(#{@plugin_dir}/lib/locale/root.yml 
                  #{@locale_dir}/all.yml
                  #{@locale_dir}/root.yml)
    @load_path.should == expected
  end
end