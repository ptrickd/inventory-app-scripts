const process = require('process')

var args = process.argv

var fileToDb = require('./fileToDb.script.js')
var dropDb = require('./dropDb.script.js')


if (args[2] === 'resetDb') {
    fileToDb.resetDb()
} else if (args[2] === 'drop') {
    dropDb.drop()
} else {
    console.log('Unknown arguments')
}

//help command
