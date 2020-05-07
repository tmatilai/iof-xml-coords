# iof-xml-coords

[![npm version](https://badge.fury.io/tmatilai/iof-xml-coords.svg)](https://badge.fury.io/tmatilai/iof-xml-coords)

Convert the coordinates in an [IOF-XML](https://orienteering.sport/iof/it/data-standard-3-0/) file to WGS84.

The conversion might be needed if the XML file is exported from e.g. [Condes](https://condes.net/) using a map with a local coordinate system.

## Installation

```sh
npm install -g iof-xml-coords
```

## Usage

```
iof-xml-coords [-s <projection>] <file>
```

### Arguments

* `file` - The source file (reads from STDIN if not specified)

### Options

* `-s, --src <projection>` -  The source projection (default: "GK25FIN")

* `-h, --help` - Display help
* `-V, --version` - Output the version number

### Projection

Currently supported projections:

* `GK25FIN` (ETRS89 / GK25FIN, [EPSG:3879](https://epsg.io/3879))
* `TM35FIN` (ETRS89 / TM35FIN, [EPSG:5048](https://epsg.io/5048))

Other projections can be specified in the [Proj4js](http://proj4js.org) format. These can be found in for example [epsg.io](https://epsg.io/).

Besides the command line option, the projection can also be passed via the `IOF_SRC` environment variable.

### Examples

Convert "ETRS89 / TM35FIN" coordinates from coursedata.xml to coursedata_wgs84.xml:

```sh
iof-xml-coords -s TM35FIN coursedata.xml > coursedata_wgs84.xml
```

Convert "ETRS89 / UTM zone 35N" ([EPSG:3047](https://epsg.io/3047)) coordinates. Output to `STDOUT`.

```sh
export IOF_SRC='+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'

iof-xml-coords < iof.xml
```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/tmatilai/iof-xml-coords](https://github.com/tmatilai/iof-xml-coords). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The software is available as open source under the terms of the [ISC License](https://opensource.org/licenses/ISC).
