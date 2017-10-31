var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var eventproxy = require('eventproxy')
var fs = require('fs')
var ep = eventproxy()
require('superagent-proxy')(superagent)

var proxy = 'http://218.201.98.196:3128'

superagent.get('http://www.jq22.com/demo/jQueryQplb201703121904/images/jq226.jpg')
  .proxy(proxy)
  .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
  .end((err, bres) => {
    if (err) {
      console.log(err)
    }
    var $ = cheerio.load(bres.body)

    let idx = path.lastIndexOf('/')
    let pathC = path.slice(0, idx)

    fs.mkdir(__dirname + '/static/' + info.name + '/' + pathC, function (err) {
      if (err) {
        console.log(err)
      }
    })
    fs.writeFile(__dirname + '/static/' + info.name + '/' + path,
      $('img'),
      function (err) {
        if (err) {
          console.log(err)
        }
      })
  })