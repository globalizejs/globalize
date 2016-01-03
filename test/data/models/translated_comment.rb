require File.expand_path('../comment', __FILE__)

class TranslatedComment < Comment
  translates :content
end
