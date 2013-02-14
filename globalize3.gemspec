require File.expand_path('../lib/globalize3/version', __FILE__)

Gem::Specification.new do |s|
  s.name         = 'globalize3'
  s.version      = Globalize3::VERSION
  s.authors      = ['Sven Fuchs', 'Joshua Harvey', 'Clemens Kofler', 'John-Paul Bader', 'Tomasz Stachewicz', 'Philip Arndt']
  s.email        = 'nobody@globalize-rails.org'
  s.homepage     = 'http://github.com/svenfuchs/globalize3'
  s.summary      = 'Rails I18n de-facto standard library for ActiveRecord 3 model/data translation'
  s.description  = "#{s.summary}."

  s.files        = Dir['{lib/**/*,[A-Z]*}']
  s.platform     = Gem::Platform::RUBY
  s.require_path = 'lib'
  s.rubyforge_project = '[none]'

  if ENV['RAILS_3_0']
    s.add_dependency 'activerecord', '~> 3.0.0'
    s.add_dependency 'activemodel', '~> 3.0.0'
  elsif ENV['RAILS_3_1']
    s.add_dependency 'activerecord', '~> 3.1.0'
    s.add_dependency 'activemodel', '~> 3.1.0'
  elsif ENV['RAILS_3_2']
  	s.add_dependency 'activerecord', '~> 3.2.0'
    s.add_dependency 'activemodel', '~> 3.2.0'
  else
    # normal case
    s.add_dependency 'activerecord', '>= 4.0.0.beta'
    s.add_dependency 'activemodel', '>= 4.0.0.beta'
  end
  s.add_dependency 'paper_trail',  '~> 2'

  s.add_development_dependency 'database_cleaner', '~> 0.6.0'
  s.add_development_dependency 'mocha'
  s.add_development_dependency 'pathname_local'
  s.add_development_dependency 'test_declarative'

  s.add_development_dependency 'sqlite3'
end
