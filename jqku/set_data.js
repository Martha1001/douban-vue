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

var proxy = 'http://221.7.1.99:8080'
var pathArr = []
var writeArr = []
var jsq = 0
var num = 0

var setData = function (info, huidiao) {
  superagent.get(info.url)
    .proxy(proxy)
    .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
    .end((err, ares) => {
      if (err) {
        console.log('获取demo页失败')
      }
      var $ = cheerio.load(ares.text)

      jsq++
      let delay = parseInt(Math.random() * 30000000 % 1000, 10)
      console.log('已抓取：' + num + '，并发数：' + jsq + '，正在爬取：' + info.url + '，耗时：' + delay)
      num++

      fs.mkdir(__dirname + '/static/' + info.name, function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.writeFile(__dirname + '/static/' + info.name + '/index.html',
        $.html(),
        function (err) {
          if (err) {
            console.log('生成html文件出错')
          }
        })

      let cssUrls = $('link')
      for (var i = 0; i < cssUrls.length; i++) {
        let cssUrl = cssUrls.eq(i).attr('href')
        if (cssUrl !== undefined && cssUrl.indexOf('http') < 0 && cssUrl.indexOf('css') >= 0) {
          pathArr.push(cssUrl)
        }
      }
      let jsUrls = $('script')
      for (var i = 0; i < jsUrls.length; i++) {
        let jsUrl = jsUrls.eq(i).attr('src')
        if (jsUrl !== undefined && jsUrl.indexOf('http') < 0) {
          pathArr.push(jsUrl)
        }
      }
      let imgUrls = $('img')
      for (var i = 0; i < imgUrls.length; i++) {
        let imgUrl = imgUrls.eq(i).attr('src')
        if (imgUrl !== undefined && imgUrl.indexOf('http') < 0) {
          pathArr.push(imgUrl)
        }
      }
      let bgUrls = $('*')
      for (var i = 0; i < bgUrls.length; i++) {
        let bgUrl = bgUrls.eq(i).css('background')
        if (bgUrl !== undefined && bgUrl.indexOf('http') < 0) {
          pathArr.push(bgUrl.substring(bgUrl.indexOf('(')+1,bgUrl.indexOf(')')))
        }
      }

      pathArr.forEach(function (path) {
        let idx = path.lastIndexOf('/')
        let pathC = path.slice(0, idx)
        if (path.indexOf('css') >= 0 || path.indexOf('js') >= 0) {
          superagent.get(info.url + '/' + path)
            .proxy(proxy)
            .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
            .buffer(true)
            .end(function (err, bres) {
              if (err) {
                console.log('err')
              }

              fs.mkdir(__dirname + '/static/' + info.name + '/' + pathC, function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.writeFile(__dirname + '/static/' + info.name + '/' + path,
                bres.text,
                function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
            })
        } else {
          superagent.get(info.url + '/' + path)
            .proxy(proxy)
            .set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'")
            .buffer(true)
            .end(function (err, cres) {
              if (err) {
                console.log('err')
              }

              fs.mkdir(__dirname + '/static/' + info.name + '/' + pathC, function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.writeFile(__dirname + '/static/' + info.name + '/' + path,
                cres.body,
                function (err) {
                  if (err) {
                    console.log(err)
                  }
                })
            })
        }
      })

      writeArr.push(testUrls.shift())
      fs.writeFile('./data/writeData.json', JSON.stringify(writeArr))
      testUrls.shift()
      fs.writeFile('./data/test.json', JSON.stringify(testUrls))

      setTimeout(function () {
        jsq--
        huidiao(null, info.url + 'Callback content')
      }, delay+3000)
    })
}

async.mapLimit(testUrls, 1, function (info, huidiao) {
  setData(info, huidiao)
}, function (err, result) {
  console.log(err)
})



