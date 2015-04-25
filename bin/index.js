'use strict'

var conf = require('../lib/config')
var cursor = require('../lib/cursor')

var promptForPassword = function () {
  var questions = [
    { type: 'password', name: 'password', message: 'password' }
  ]

  require('inquirer').prompt(questions, function (anwsers) {
    conf.password = anwsers.password
    tail()
  })
}

var tail = function () {
  cursor()
    .on('error', function (err) {
      console.error(err.message)
      process.exit(1)
    })
    .on('end', function () {
      console.error('ERROR: Unexpected end of cursor')
      process.exit(1)
    })
    .on('data', log)
}

var log = function (doc) {
  doc = conf.pretty ? require('util').inspect(doc, { depth: null, colors: true }) : JSON.stringify(doc)
  console.log(doc)
}

if (conf.password === true) promptForPassword()
else tail()
