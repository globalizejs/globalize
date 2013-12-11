source 'https://rubygems.org'

gemspec

# forking off airblade/paper_trail to use the rails4 branch.
gem 'paper_trail', github: 'airblade/paper_trail', branch: 'master'
# Per https://github.com/bmabey/database_cleaner/issues/224
gem 'database_cleaner', github: 'bmabey/database_cleaner', branch: 'master'

platforms :rbx do
  gem 'rubysl', '~> 2.0'
end

group :test do
  gem 'pry'
  gem 'pry-nav'
end
