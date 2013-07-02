source 'https://rubygems.org'

gemspec

  # forking off airblade/paper_trail to use the rails4 branch.
  gem 'paper_trail', :github => 'airblade/paper_trail', :branch => 'rails4'
  # for https://github.com/bmabey/database_cleaner/pull/153
  #gem 'database_cleaner', :github => 'bmabey/database_cleaner', :branch => 'master'
  # for https://github.com/bmabey/database_cleaner/pull/209
  gem 'database_cleaner', git: 'https://github.com/tommeier/database_cleaner', branch: 'fix-superclass'


group :test do
    gem 'pry'
    gem 'pry-nav'
  end
