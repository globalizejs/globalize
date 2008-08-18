require File.dirname(__FILE__) + '/../spec_helper.rb'
require 'active_record'
require 'model_translation'
require File.expand_path(File.join(File.dirname(__FILE__), 'models', 'post'))
  
describe ModelTranslation do
  include Spec::Matchers::HaveAttribute
  
  DB_FILE = File.expand_path(File.join(File.dirname(__FILE__), 'test.db'))
  
  before do
    FileUtils.rm(DB_FILE)   # Start from scratch
    ActiveRecord::Migration.verbose = false   # quiet down the migration engine
    ActiveRecord::Base.establish_connection({
      :adapter => 'sqlite3',
      :dbfile => DB_FILE
    })
    ActiveRecord::Base.silence do
      load File.expand_path(File.join(File.dirname(__FILE__), 'models', 'schema.rb'))
    end
  end
  
  it "has the attributes :locale, :requested_locale" do
  end
end
