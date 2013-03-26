require File.expand_path('../post', __FILE__)

class ReloadingPost < Post
  after_create { reload }
end
