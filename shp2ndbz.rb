require 'find'

Find.find('../25000') {|path|
  next unless /shp$/.match path
  dst = "#{path}.ndjson.bz2"
  if File.exist?(dst)
  else 
    print "node index.js #{path} 25000 | bzip2 --fast > #{dst}\n"
  end
}

