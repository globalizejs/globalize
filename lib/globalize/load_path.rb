# Locale load_path and Locale loading support.
#
# To use this include the Globalize::LoadPath::I18n module to I18n like this:
#
#   I18n.send :include, Globalize::LoadPath::I18n
#
# Clients can add load_paths using:
#
#   I18n.load_path.add load_path, 'rb', 'yml'   # pass any number of extensions like this
#   I18n.load_path << 'path/to/dir'             # usage without an extension, defaults to 'yml'
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

module Globalize
  class LoadPath < Array
    def extensions
      @extensions ||= ['rb', 'yml']
    end
    attr_writer :extensions
  
    def locales
      @locales ||= ['*']
    end
    attr_writer :locales
  
    def <<(path)
      push path
    end
  
    def push(*paths)
      super(*paths.map{|path| filenames(path) }.flatten.uniq.sort)
    end
  
    protected
  
      def filenames(path)
        return [path] if File.file? path
        patterns(path).map{|pattern| Dir[pattern] }
      end
  
      def patterns(path)
        locales.map do |locale|
          extensions.map do |extension|
            %W(#{path}/all.#{extension} #{path}/#{locale}.#{extension} #{path}/#{locale}/**/*.#{extension})
          end
        end.flatten.uniq
      end
  end
end