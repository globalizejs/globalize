require File.expand_path('../lib/globalize/version', __FILE__)

Gem::Specification.new do |s|
  s.name         = 'globalize'
  s.version      = Globalize::Version
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

  s.add_dependency 'activerecord', '>= 4.2.0', '< 4.3'
  s.add_dependency 'activemodel', '>= 4.2.0', '< 4.3'

  s.add_development_dependency 'database_cleaner', '~> 1.4.0'
  s.add_development_dependency 'minitest'
  s.add_development_dependency 'minitest-reporters'

  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'rdoc'

  s.add_development_dependency 'rake'
  s.post_install_message = <<-END

Globalize has extracted versioning support to a separate gem named
globalize-versioning. If you are using versioning (with paper_trail
or any other versioning gem), please add the line
"gem 'globalize-versioning'" to your Gemfile and go to the github
page at globalize/globalize-versioning if you encounter any problems.

Note that the globalize-versioning gem does not delegate versions to
the translation table, so you will have to update your syntax to
the form: `post.translation.versions`. See the globalize-versioning
readme for details.

  END
end
