require File.dirname(__FILE__) + '/spec/helper.rb'
require 'globalize/load_path'

describe I18n::LoadPath do
  before :each do
    @locale_dir = "#{File.dirname(__FILE__)}/spec/fixtures/locale"
    @load_path = I18n.load_path
    @load_path << @locale_dir if @load_path.empty?
  end
  
  it "returns an instance of I18n::LoadPath from I18n.load_path" do
    @load_path.should be_instance_of(I18n::LoadPath)
  end
  
  it "allows to add paths (using yml as a default file extension)" do
    @load_path.should == [[@locale_dir, ['yml']]]
  end
  
  it "allows to specify a single file extension while adding a path" do
    load_path = I18n::LoadPath.new
    load_path.add(@locale_dir, 'rb')
    load_path.should == [[@locale_dir, ['rb']]]
  end
  
  it "allows to specify an array of file extensions while adding a path" do
    load_path = I18n::LoadPath.new
    load_path.add(@locale_dir, 'rb', 'yml')
    load_path.should == [[@locale_dir, ['rb', 'yml']]]
  end
  
  it "creates glob patterns which enforce the default directory structure" do
    load_path = I18n::LoadPath.new
    load_path.add(@locale_dir, 'rb', 'yml')
    locale = 'en-US'
    patterns = %W( #{@locale_dir}/#{locale}/**/*.rb 
                   #{@locale_dir}/#{locale}.rb 
                   #{@locale_dir}/all.rb
                   #{@locale_dir}/#{locale}/**/*.yml 
                   #{@locale_dir}/#{locale}.yml 
                   #{@locale_dir}/all.yml )
    load_path.send(:patterns, locale).should == patterns
  end
  
  it "finds all locale files for a given locale including the all file and files in the locale-specific subdirectory" do
    @load_path.filenames('fi-FI').should == ["#{@locale_dir}/all.yml", "#{@locale_dir}/fi-FI/module.yml"]
  end
  
  it "finds all locale files for a given locale including the all file and locale-specific files" do
    @load_path.filenames('de-DE').should == ["#{@locale_dir}/all.yml", "#{@locale_dir}/de-DE.yml"]
  end
end

describe I18n, "#load_locales" do
  before :each do
    @locale_dir = "#{File.dirname(__FILE__)}/spec/fixtures/locale"
    @load_path = I18n.load_path
    @load_path << @locale_dir if @load_path.empty?
  end
  
  it "loading locale data for the given locales from all files in the current load_path" do
    I18n.should_receive(:load_locale).with('en-US').once.ordered
    I18n.should_receive(:load_locale).with('de-DE').once.ordered
    I18n.load_locales('en-US', 'de-DE')
  end
  
  it "loading locale data for the given locale from all files in the current load_path" do
    I18n.load_locale('en-US')
    I18n.locale = 'en-US'
    keys = [:"from-all-file", :"from-locale-file", :"from-locale-dir"]
    translations = ['From the "all" file.', 'From the locale file.', 'From the locale directory.']
    I18n.t(keys).should == translations
  end
end