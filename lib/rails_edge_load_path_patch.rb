module I18n
  @@load_path = nil
  @@default_locale = :'en-US'
  
  class << self
    def load_path
      @@load_path ||= []
    end
    
    def load_path=(load_path)
      @@load_path = load_path
    end
  end
end

I18n::Backend::Simple.module_eval do
  def initialized?
    @initialized ||= false
  end
  
  protected

    def init_translations
      load_translations(*I18n.load_path)
      @initialized = true
    end
    
    def lookup(locale, key, scope = [])
      return unless key
      init_translations unless initialized?
      keys = I18n.send :normalize_translation_keys, locale, key, scope
      keys.inject(translations){|result, k| result[k.to_sym] or return nil }
    end
end

rails_dir = File.expand_path "#{File.dirname(__FILE__)}/../../../rails/"
paths = %w(actionpack/lib/action_view/locale/en-US.yml 
           activerecord/lib/active_record/locale/en-US.yml
           activesupport/lib/active_support/locale/en-US.yml)
paths.each{|path| I18n.load_path << "#{rails_dir}/#{path}" }
