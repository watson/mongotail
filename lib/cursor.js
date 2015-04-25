'use strict'

var mongojs = require('mongojs')
var conf = require('./config')
var getUri = require('./uri')

module.exports = function () {
  var uri = getUri()
  var cursor = mongojs(uri).collection(conf.collection)
  var query = {}
  var opts = { tailable: true, timeout: false } // awaitdata: true, numberOfRetries: -1

  if (conf.isOplog) {
    var timestamp = new mongojs.Timestamp(0, Math.floor(new Date().getTime() / 1000))
    query = { ts: { $gt: timestamp } }

    // A more clever way to find the right point in the Oplog where to start
    // tailing: Move the curser to the end of the oplog and jump backwards in
    // chunks until the query is satisfied.
    opts.oplogReplay = true
  }

  return cursor.find(query, {}, opts)
}
