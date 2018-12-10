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
$ node index.js somewhere/shapefile.shp src_id
```
The src_id is added as _src property of all the features.

Often this command can be used like the following. This finds Shapefile files in some_directory, and store features in target.ndjson.
```console
$ find some_directory -name "*.shp" | xargs -n 1 -I "{}" echo node index.js "{}" src_id | sh > target.ndjson
```

Sometimes it is good to process the files in a reverse-dictionary order in that case, you can use sort like the following.

```console
$ find some_directory -name "*.shp" | sort --reverse | xargs -n 1 -I "{}" echo node index.js "{}" src_id | sh > target.ndjson
```
Or to make ndjson.bz2 file for each shapefile:

```console
$ find ../25000 -name "*.shp" | sort --reverse | xargs -n 1 -I "{}" echo node index.js "{}" 25000 "|" bzip2 --fast ">" "{}".ndjson.bz2  | sh
```
