"use strict";
var N3 = require('n3');
var moment = require('moment');

var writer = N3.Writer(process.stdout, { end: false });

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

setInterval(function(){ 
	var now = moment().format();                          // 2018-02-26T14:44:51+01:00
	// Context is an observation of a crossroad at a certain time
	var context = 'http://example.org/observations?time=' + now.substring(0,19) // 2018-02-26T14:44:
	// First traffic light
	writer.addTriple('http://example.org/light/1',
                 'http://example.org/statusLight',
                 'http://example.org/status#green',
                 context);
	writer.addTriple('http://example.org/light/1',
                 'http://example.org/color',
                 '"' + getRandomColor() + '"',
                 context);
	// Second traffic light
	writer.addTriple('http://example.org/light/2',
                 'http://example.org/statusLight',
                 'http://example.org/status#red',
                 context);
	writer.addTriple('http://example.org/light/2',
                 'http://example.org/color',
                 '"' + getRandomColor() + '"',
                 context);
	// Named graph metadata
	writer.addTriple(context,
				'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
				[ 'http://www.w3.org/ns/prov#Bundle',
				'http://www.w3.org/ns/prov#Entity']);
	writer.addTriple(context,
				'http://www.w3.org/ns/prov#generatedAtTime',
				'"' + now + '"^^http://www.w3.org/2001/XMLSchema#DateTime'
				);
	writer.addTriple(context,
			'http://example.org/crossRoad',
			'http://example.org/crossRoad/1'
			);	
}, 3000);


