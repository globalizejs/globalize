class ReloadingPost < Post
  after_create { reload }
end
