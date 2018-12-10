const shapefile = require('shapefile')
const config = require('config')
const fs = require('fs')

if (process.argv.length != 4) {
  console.log('usage node index.js somewhere/shapefile.shp src_id')
  process.exit()
}

const encoding = path => {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path)
  } else {
    return 'Windows-31J'
  }
}

shapefile.open(
  process.argv[2], 
  process.argv[2].replace('shp', 'dbf'),
  { encoding: encoding(process.argv[2].replace('shp', 'cpg')) }
)
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) return
      let f = result.value
      for (const key in f.properties) {
        if (typeof f.properties[key] === 'string') {
          f.properties[key] = f.properties[key].replace(/\0/g, '').trim() || null
        }
      }
      f.properties._src = process.argv[3]
      console.log(JSON.stringify(f))
      return source.read().then(log)
    }))
  .catch(error => console.error(error.stack))

console.error(`finished ${process.argv[2]}.`)
