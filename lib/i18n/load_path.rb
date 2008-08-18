# Locale load_path and Locale loading support.
#
# Clients can add load_paths using:
#
#   I18n.load_path << 'path/to/dir'
#   I18n.load_path.extensions = ['yml', 'rb']
#   I18n.load_path.patterns << "#{load_path}/#{locale}/**/*.yml" << "#{load_path}/#{locale}.yml" << "#{load_path}/all.yml"
#   I18n.default_load_paths base_path, extension
#   I18n.load_path << I18n.default_load_paths(load_path, 'rb')
#   I18n.load_path.add load_path, 'rb'
#
# And load locale data using either of:
#
#   I18n.load_locales 'en-US', 'de-DE'
#   I18n.load_locale 'en-US'
# 
# This will lookup all files named like:
#
#   'path/to/dir/all.yml'
#   'path/to/dir/en-US.yml'
#   'path/to/dir/en-US/*.yml'
#
# The filenames will be passed to I18n.load_translations which delegates to 
# the backend. So the actual behaviour depends on the implementation of the
# backend. I18n::Backend::Simple will be able to read YAML and plain Ruby 
# files. See the documentation for I18n.load_translations for details.

module I18n
  class << self
    def load_path
      @@load_path ||= LoadPath.new
    end
    
    def load_locales(*locales)
      locales.each{|locale| load_locale locale }
    end
    
    def load_locale(locale)
      load_path.filenames(locale).each do |filename|
        backend.load_translations filename
      end
    end
  end
  
  class LoadPath < Array
    # Adds a path to the locale load paths so it will be searched for locale
    # classes and translation files. 
    def <<(path)
      add path
    end
    
    def add(path, extensions = ['yml'])
      extensions = [extensions] unless extensions.is_a? Array
      push [path, extensions]
    end
    
    def filenames(locale)
      patterns(locale).map{|pattern| Dir[pattern] }.flatten.uniq.sort
    end
    
    protected
    
    def patterns(locale)
      map do |path, extensions|
        extensions.map do |extension|
          %W(#{path}/#{locale}/**/*.#{extension} #{path}/#{locale}.#{extension} #{path}/all.#{extension})
        end
      end.flatten
    end
  end
end


