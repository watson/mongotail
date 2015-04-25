'use strict'

var argv = require('minimist')(process.argv.slice(2))

var collection = argv.collection || argv.c || 'oplog.rs'

module.exports = {
  uri: argv['_'].shift() || '',
  host: argv.host,
  port: argv.port,
  database: argv.database || argv.d,
  collection: collection,
  username: argv.username || argv.u || '',
  password: argv.password || argv.p || '',
  pretty: argv.pretty,
  isOplog: collection === 'oplog.rs'
}
