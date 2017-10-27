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

var proxy = ''
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
      console.log('已抓取：' + num + '，并发数：' + jsq + '，正在爬取：' + url + '，耗时：' + delay)
      num++

      fs.mkdir(__dirname + '/static/' + info.name, function (err) {
        if (err) {
          console.log(err)
        }
      })

      //新建html
      function getHtml() {
        fs.writeFile(__dirname + '/static/' + info.name + '/index.html',
          $,
          function (err) {
            if (err) {
              console.log('生成html文件出错')
            }
          })
        // ep.emit('getHtml', Htmls)
      }
      //获取html内部资源
      function getStyle() {
        var _urls = $('link').attr('src')
        _urls.forEach(function (_url) {
          superagent.get(_url)
            .proxy(proxy)
            .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
            .end((err, res) => {
              let $ = cheerio.load(res.text)
              fs.writeFile(__dirname + '/static/' + info.name + _url,
                $,
                function (err) {
                  if (err) {
                    console.log('生成html文件出错')
                  }
                })
            })
        });
        // ep.emit('getStyle', Styles)
      }
      function getScript() {
        ep.emit('getScript', Scrips)
      }
      function getImg() {
        ep.emit('getImg', Imgs)
      }
      function setALink() {
        ep.emit('setALink', ALinks)
      }
      setTimeout(function () {
        jsq--
        huidiao(null, url + 'Callback content')
      }, delay)
    })

}

async.mapLimit(testUrls, 1, function (info, huidiao) {
  // setData(info, huidiao)


}, function (err, result) {
  console.log(err)
})




