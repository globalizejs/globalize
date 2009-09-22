require 'globalize/model/active_record'

I18n.backend = Globalize::Backend::Static.new

I18n.load_path = Globalize::LoadPath.new I18n.load_path
I18n.load_path << "#{File.dirname(__FILE__)}/lib/locale"
I18n.load_path << "#{RAILS_ROOT}/lib/locale"

