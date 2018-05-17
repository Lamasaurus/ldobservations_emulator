"use strict"
var N3 = require('n3')
var moment = require('moment')
const fs = require('fs')
var spat_log = JSON.parse(fs.readFileSync(__dirname + '/SPAT_log.json', 'utf8')).reverse()
var index = 0

function getUpdateForUri(url) {
  var response = spat_log[(index++) % spat_log.length]
  response["url"] = url
  return response
}

setInterval(function(){ console.log(JSON.stringify(getUpdateForUri("http://data.observer.be/kruispunten/1"))); }, 200)