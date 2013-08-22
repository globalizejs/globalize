source 'https://rubygems.org'

gemspec

# forking off airblade/paper_trail to use the rails4 branch.
gem 'paper_trail', github: 'airblade/paper_trail', branch: 'master'
# Per https://github.com/bmabey/database_cleaner/issues/224
gem 'database_cleaner', github: 'tommeier/database_cleaner', branch: 'fix-superclass-1-1-1'

group :test do
  gem 'pry'
  gem 'pry-nav'
end
