source 'https://rubygems.org'

gemspec

unless ENV['RAILS_3_0'] || ENV['RAILS_3_1'] || ENV['RAILS_3_2']
  #git 'git://github.com/rails/rails.git', :ref => '182d4e37191d' do
  path '/code/rails' do
    gem 'activerecord'
    gem 'activemodel'
  end

  # forking off airblade/paper_trail to use the rails4 branch.
  #gem 'paper_trail', :github => 'lucisferre/paper_trail', :branch => 'rails4'
  path '/code/parndt/paper_trail'
  # for https://github.com/bmabey/database_cleaner/pull/153
  #gem 'database_cleaner', :github => 'bmabey/database_cleaner', :branch => 'master'
  path '/code/database_cleaner'
end

group :test do
    gem 'pry'
    gem 'pry-nav'
  end
