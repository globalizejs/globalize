require 'rails_edge_load_path_patch.rb' unless I18n.respond_to?(:load_path)

ActiveRecord::Base.send :include, Globalize::Model::ActiveRecord::Translated

I18n.backend = Globalize::Backend::Static.new

I18n.load_path = Globalize::LoadPath.new I18n.load_path
I18n.load_path << "#{File.dirname(__FILE__)}/lib/locale"
I18n.load_path << "#{RAILS_ROOT}/lib/locale"

