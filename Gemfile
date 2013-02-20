source 'https://rubygems.org'

gemspec

unless ENV['RAILS_3_0'] || ENV['RAILS_3_1'] || ENV['RAILS_3_2']
  git 'git://github.com/rails/rails.git' do
    gem 'activerecord'
    gem 'activemodel'
  end

  # forking off airblade/paper_trail to use the rails4 branch.
  gem 'paper_trail', :github => 'airblade/paper_trail', :branch => 'rails4'
  # for https://github.com/bmabey/database_cleaner/pull/153
  gem 'database_cleaner', :github => 'bmabey/database_cleaner', :branch => 'master'
end

group :test do
    gem 'pry'
    gem 'pry-nav'
  end
