"use strict";
var N3 = require('n3');
var moment = require('moment');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomCount() {
  return Math.floor(Math.random() * 100)
}

function getUpdateForUri(uri) {
  var now = moment().format();                          // 2018-02-26T14:44:51+01:00
  // Context is an observation of a crossroad at a certain time
  var context = 'http://example.org/observations?time=' + now.substring(0,19) // 2018-02-26T14:44:51
  return {
    "@context": {
      "generatedAt": {
        "@id": "http://www.w3.org/ns/prov#generatedAtTime",
        "@type": "http://www.w3.org/2001/XMLSchema#date"
      },
      "statusLight": "http://example.org/statusLight",
      "TrafficLight": "http://example.org/TrafficLight",
      "color": "http://example.org/color",
      "about": "http://www.w3.org/1999/02/22-rdf-syntax-ns#about",
      "longitude": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
      "latitude": "http://www.w3.org/2003/01/geo/wgs84_pos#lat"
    },
    "@id": context,
    "generatedAt": now,
    "@type": ["http://www.w3.org/ns/prov#Entity", "TrafficLight"],
    "about": uri,
    "statusLight": "http://example.org/status#green",
    "color": getRandomColor(),
    "count": getRandomCount(),
  }
}
setInterval(function(){ 
console.log(JSON.stringify(getUpdateForUri("http://data.observer.be/verkeerslichten/1")));
console.log(JSON.stringify(getUpdateForUri("http://data.observer.be/verkeerslichten/2")));
}, 3000);