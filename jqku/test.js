var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var eventproxy = require('eventproxy')
var fs = require('fs')
var ep = eventproxy()
require('superagent-proxy')(superagent)

// var demoList = require('./static/demoList.json')
var writeDatas = require('./data/writeData.json')
var testUrls = require('./data/test.json')

var writeArr = []

writeArr.push(testUrls.shift())
fs.writeFile('./data/writeData.json', JSON.stringify(writeArr))
testUrls.shift()
fs.writeFile('./data/test.json', JSON.stringify(testUrls))

