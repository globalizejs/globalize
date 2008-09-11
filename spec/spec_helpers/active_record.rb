module Spec
  module Helpers
    module ActiveRecord
      DB_FILE = File.expand_path(File.join(File.dirname(__FILE__), '..', 'db', 'test.db'))
      
      def reset_db
        FileUtils.rm_f(DB_FILE)                     # Start from scratch
        ::ActiveRecord::Migration.verbose = false   # Quiet down the migration engine
        ::ActiveRecord::Base.establish_connection({
          :adapter => 'sqlite3',
          :dbfile => DB_FILE
        })
        ::ActiveRecord::Base.silence do
          load File.expand_path(File.join(File.dirname(__FILE__), '..', 'spec_models', 'schema.rb'))
        end
      end
    end
  end
end
