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

var proxy = 'http://218.201.98.196:3128'
var jsq = 0
var num = 0

var setData = function (info, huidiao) {
  superagent.get(info.url)
    .proxy(proxy)
    .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
    .end((err, ares) => {
      if (err) {
        console.log('获取dome页失败')
      }

      var $ = cheerio.load(ares.text)

      jsq++
      var delay = parseInt(Math.random() * 30000000 % 1000, 10)
      console.log()
      console.log('已抓取：' + num + '，并发数：' + jsq + '，正在爬取：' + info.url + '，耗时：' + delay)
      num++

      // fs.mkdir(__dirname + '/static/' + info.name, function (err) {
      //   if (err) {
      //     console.log(err)
      //   }
      // })

      // fs.writeFile(__dirname + '/static/' + info.name + '/index.html',
      //   $.html(),
      //   function (err) {
      //     if (err) {
      //       console.log('生成html文件出错')
      //     }
      //   })

      let _urls = $('link').attr('href')
      for (var i = 0; i <= _urls.length; i++) {
        console.log(info.url + '/' + _urls[i])
        superagent.get(info.url + '/' + _urls[i])
          .proxy(proxy)
          .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
          .end((err, res) => {
            let $ = cheerio.load(res.text)
            fs.writeFile(__dirname + '/static/' + _urls[i],
              $('body').text(),
              function (err) {
                if (err) {
                  console.log(err)
                }
              })
          })
      }
      setTimeout(function () {
        jsq--
        huidiao(null, info.url + 'Callback content')
      }, delay)
    })

}

async.mapLimit(testUrls, 1, function (info, huidiao) {
  setData(info, huidiao)
}, function (err, result) {
  console.log(err)
})




