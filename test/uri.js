'use strict'

var test = require('tape')
var extend = require('deep-extend')
var conf = require('../lib/config')
var getUri = require('../lib/uri')

var origConf = extend({}, conf)
var setConf = function (newConf) {
  extend(conf, origConf, newConf || {})
}

test('capped collection', function (t) {
  setConf({ database: 'foo', isOplog: false })
  t.equals(getUri(), 'mongodb://localhost:27017/foo')
  t.end()
})

test('oplog', function (t) {
  setConf({ database: 'foo', isOplog: true })
  t.equals(getUri(), 'mongodb://localhost:27017/local?authSource=foo')
  t.end()
})

test('datbase uri', function (t) {
  setConf({ uri: 'foo', database: 'invalid', isOplog: true })
  t.equals(getUri(), 'mongodb://localhost:27017/local?authSource=foo')
  t.end()
})

test('full uri', function (t) {
  setConf({ uri: 'example.net/foo', database: 'invalid', isOplog: true })
  t.equals(getUri(), 'mongodb://example.net:27017/local?authSource=foo')
  t.end()
})

test('auth', function (t) {
  setConf({ username: 'user', password: 'secret', database: 'foo', isOplog: true })
  t.equals(getUri(), 'mongodb://user:secret@localhost:27017/local?authSource=foo')
  t.end()
})

test('host', function (t) {
  setConf({ username: 'user', password: 'secret', host: 'example.net', database: 'foo', isOplog: true })
  t.equals(getUri(), 'mongodb://user:secret@example.net:27017/local?authSource=foo')
  t.end()
})

test('port', function (t) {
  setConf({ username: 'user', password: 'secret', host: 'example.net', port: 42, database: 'foo', isOplog: true })
  t.equals(getUri(), 'mongodb://user:secret@example.net:42/local?authSource=foo')
  t.end()
})
