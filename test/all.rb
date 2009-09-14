files = Dir[File.dirname(__FILE__) + '/**/*_test.rb']
files.each { |file| require file }