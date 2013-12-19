Gem::Specification.new do |s|
  s.name         = 'globalize'
  s.version      = '4.0.0.alpha.3'
  s.authors      = ['Sven Fuchs', 'Joshua Harvey', 'Clemens Kofler', 'John-Paul Bader', 'Tomasz Stachewicz', 'Philip Arndt', 'Chris Salzberg']
  s.email        = 'nobody@globalize-rails.org'
  s.homepage     = 'http://github.com/globalize/globalize'
  s.summary      = 'Rails I18n de-facto standard library for ActiveRecord model/data translation'
  s.description  = "#{s.summary}."
  s.license      = "MIT"

  s.files        = Dir['{lib/**/*,[A-Z]*}']
  s.platform     = Gem::Platform::RUBY
  s.require_path = 'lib'
  s.rubyforge_project = '[none]'

  if ENV['RAILS_4_0']
    s.add_dependency 'activerecord', '>= 4.0.0'
    s.add_dependency 'activemodel', '>= 4.0.0'
  else
    s.add_dependency 'activerecord', '>= 4.1.0.beta1'
    s.add_dependency 'activemodel', '>= 4.1.0.beta1'
  end

  s.add_dependency 'paper_trail',  '~> 3.0.0.beta'

  s.add_development_dependency 'database_cleaner'
  s.add_development_dependency 'minitest'
  s.add_development_dependency 'minitest-colorize'

  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'rdoc'

  s.add_development_dependency 'rake'
end
