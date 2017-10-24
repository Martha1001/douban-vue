var http = require('http')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var async = require('async')
var fs = require('fs')

var ep = eventproxy()

var pageNum = 160
var pageUrls = []
var dataLists = []
var showUrls = []
var detail = {}

//创建本地服务器
// http.createServer(onRequest).listen(8888)
// function onRequest(request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
// }

for (var i = 1; i <= pageNum; i++) {
  pageUrls.push('http://www.jq22.com/jq' + i + '-jq')
}

pageUrls.forEach(function (pageUrl) {
  superagent.get(pageUrl)
    .end((err, ares) => {
      if (err) {
        console.log('轮询链接列表出错')
      }

      var $ = cheerio.load(ares.text)
      for (var i = 1; i < 16; i++) {
        var urlArray = 'http://www.jq22.com/' + $('.cover-info').eq(i).find('a').attr('href')
        ep.emit('getPage', urlArray)

        fs.appendFile('url.txt', urlArray + '\n', function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    })
})

ep.after('getPage', pageNum * 15, function (urlArrays) {
  var jsq = 0

  var getData = function (url, callback) {
    superagent.get(url)
      .end((err, bres) => {
        if (err) {
          console.log('获取单页出错')
        }

        jsq++
        var delay = parseInt(Math.random() * 30000000 % 1000, 10)
        console.log('当前并发数：' + jsq + '，正在爬取：' + url + '，耗时：' + delay)

        var $ = cheerio.load(bres.text)
        let pageurl = $('.thumbile').find('.btn-success').attr('href')
        let id = $('.thumbile').find('.btn-success').attr('href').match(/\d{5}/g).toString()
        let title = $('.project-header h1').text()
        let summary = $('.cjms').text()
        let image = $('.thumbile').first().attr('src')
        let type = $('.project-header>p').text()
        let ie = $('.project-content img').eq(1).attr('alt')
        let all = $('.project-content img').eq(1).attr('src')

        superagent.get(pageurl)
          .end((err, cres) => {
            var $ = cheerio.load(cres.text)
            let demo = $('#iframe').attr('src')
            let time = $('#iframe').attr('src').match(/\d{12}/g).toString()

            detail = {
              id: id,
              title: title,
              summary: summary,
              type: type,
              url: url,
              demo: demo,
              image: image,
              compatible: {
                ie: ie,
                all: all
              },
              time: time
            }
            fs.appendFile('list.json', JSON.stringify(detail) + ',\n', function (err) {
              if (err) {
                console.log(err)
              }
            })
          })
        setTimeout(function () {
          jsq--
          callback(null, url + 'Callback content')
        }, delay)
      })
  }

  async.mapLimit(urlArrays, 2, function (url, callback) {
    getData(url, callback)
  }, function (err, result) {
    console.log(err)
  })

})



