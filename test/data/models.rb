Dir[File.expand_path('../models/**/*.rb', __FILE__)].each do |model|
  require model
end
