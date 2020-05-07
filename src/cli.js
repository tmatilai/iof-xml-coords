#!/usr/bin/env node
'use strict';

const cheerio = require('cheerio');
const coords = require('./coords');
const fs = require('fs');
const pkg = require('../package.json');
const program = require('commander');

var srcFile = null;

program
  .version(pkg.version)
  .usage('[-s <projection>] <file>')
  .description('Convert the coordinates in an IOF-XML file to WGS84', {
    file: 'the source file (defaults to STDIN)'
  })
  .arguments('[file]')
  .option('-s, --src <projection>', `source projection (default: "${coords.srcProjection}")`)
  .action(function (file) {
    srcFile = file;
  })

program.on('--help', () => {
  console.log('');
  console.log('Projection:');
  console.log('  The projection can be specified either by a supported name,');
  console.log('  or in the format specified in http://proj4js.org');
  console.log('\n  Supported projections:\n    ' + coords.projections.join('\n    '));
  console.log('');
  console.log('More information:');
  console.log('  https://github.com/tmatilai/iof-xml-coords');
});

program.parse(process.argv);

coords.srcProjection = program.src || process.env.IOF_SRC || coords.srcProjection;

function convert(data) {
  var $ = cheerio.load(data, { xmlMode: true });

  $('Position').each(function() {
    var src = $(this).attr();
    var wgs84;
    try {
      wgs84 = coords.convert(src.lng, src.lat);
    } catch(e) {
      process.stderr.write('Failed to convert coordinates.', e);
      throw e;
    }
    $(this).attr('lng', wgs84[0]);
    $(this).attr('lat', wgs84[1]);
  });

  process.stdout.write($.xml());
}

if (typeof srcFile === 'string') {
  convert(fs.readFileSync(srcFile));
} else if (!process.stdin.isTTY) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', convert);
} else {
  process.stderr.write('Error: Nothing to read from STDIN\n\n');
  process.stderr.write(program.helpInformation());
  process.exit(64);
}
