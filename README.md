# shapefile-pass-through
# background
I wanted to convert a bunch of Shapefile files.

# install
```console
$ git clone git@github.com:hfu/shapefile-pass-through
$ cd shapefile-pass-through
$ npm install
```

# usage
To convert a single Shapefile file:
```console
$ node index.js somewhere/shapefile.shp
```

Often this command can be used like the following. This finds Shapefile files in some_directory, and store features in target.ndjson.
```console
$ find some_directory -name "*.shp" | xargs -n 1 -I "{}" echo node index.js "{}" | sh > target.ndjson
```
