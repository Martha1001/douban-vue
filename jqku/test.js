var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var eventproxy = require('eventproxy')
var fs = require('fs')
var ep = eventproxy()
require('superagent-proxy')(superagent)
var proxy = 'http://42.242.189.239:4336'
var pathArr = []


superagent.get('http://www.jq22.com/demo/jQueryQpSfq201703122233')
  .proxy(proxy)
  .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
  .end((err, ares) => {
    if (err) {
      console.log('获取demo页失败')
    }
    var $ = cheerio.load(ares.text)
    let bgUrls = $('*').attr('style')
    console.log(bgUrls.length)
    // for (var i = 0; i < bgUrls.length; i++) {
    //   let bgUrls = bgUrlss.eq(i).attr('style')
    //   if (bgUrls !== undefined && bgUrls.indexOf('http') < 0) {
    //     pathArr.push(bgUrls)
    //   }
    // }
    // console.log(pathArr)

  })
