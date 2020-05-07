const proj4 = require('proj4');

var dstProjection = 'WGS84';
var srcProjection = 'GK25FIN';

function init() {
  proj4.defs('EPSG:3879', '+proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
  proj4.defs('EPSG:5048', '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

  proj4.defs('GK25FIN', proj4.defs('EPSG:3879'));
  proj4.defs('TM35FIN', proj4.defs('EPSG:5048'));
}

function convert(x, y) {
  var coordinates =  [parseInt(x), parseInt(y)];
  return proj4(this.srcProjection, this.dstProjection, coordinates);
}
exports.convert = convert;

exports.dstProjection = dstProjection;
exports.srcProjection = srcProjection;

exports.projections = [
  'GK25FIN / EPSG:3879',
  'TM35FIN / EPSG:5048'
];

init();
