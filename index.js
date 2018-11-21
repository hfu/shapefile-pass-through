const shapefile = require('shapefile')

if (process.argv.length != 3) {
  console.log('usage node index.js somewhere/shapefile.shp')
  process.exit()
}

shapefile.open(
  process.argv[2], 
  process.argv[2].replace('shp', 'dbf'),
//  { encoding: 'UTF-8' }
  { encoding: 'Windows-31J' }
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
      console.log(JSON.stringify(result.value))
      return source.read().then(log)
    }))
  .catch(error => console.error(error.stack))


