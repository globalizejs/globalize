require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

desc 'Default: run unit tests.'
task :default => :test

desc 'Test the globalize2 plugin.'
Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = true
end

desc 'Generate documentation for the globalize2 plugin.'
Rake::RDocTask.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'Globalize2'
  rdoc.options << '--line-numbers' << '--inline-source'
  rdoc.rdoc_files.include('README')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

begin
  require 'jeweler'
  Jeweler::Tasks.new do |s|
    s.name = "globalize2"
    s.summary = "Rails I18n: de-facto standard library for ActiveRecord data translation"
    s.description = "Rails I18n: de-facto standard library for ActiveRecord data translation"
    s.email = "joshmh@gmail.com"
    s.homepage = "http://github.com/joshmh/globalize2"
    # s.rubyforge_project = ''
    s.authors = ["Sven Fuchs, Joshua Harvey, Clemens Kofler"]
    # s.add_development_dependency ''
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler not available. Install it with: sudo gem install technicalpickles-jeweler -s http://gems.github.com"
end
