'use strict'

var querystring = require('querystring')
var muri = require('muri')
var conf = require('./config')

var normalizeUri = function () {
  var uri = conf.uri
  var database = conf.database

  if (uri && !~uri.indexOf('/')) {
    // a URI without a / is interpreted as just a database name
    database = uri
    uri = null
  }

  if (!uri) {
    // muri doesn't know how to fall back to localhost
    var hosts = (conf.host || 'localhost') + (conf.port ? ':' + conf.port : '')
    uri = hosts + '/' + database
  }

  // muri is really picky about the protocol
  if (!~uri.indexOf('mongodb://')) uri = 'mongodb://' + uri

  return uri
}

module.exports = function () {
  var uri = normalizeUri()
  var result = muri(uri)

  var auth = ''
  var username = conf.username || (result.auth || {}).username
  var password = conf.password || (result.auth || {}).password
  if (username || password) auth = username + ':' + password + '@'

  var hosts = result.hosts.map(function (host) { return host.host + ':' + host.port }).join(',')

  if (conf.isOplog && !result.options.authSource) result.options.authSource = result.db

  var query = querystring.stringify(result.options)
  if (query) query = '?' + query

  return 'mongodb://' + auth + hosts + '/' + (conf.isOplog ? 'local' : result.db) + query
}
