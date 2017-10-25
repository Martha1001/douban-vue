var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var fs = require('fs')
var sour = require('./data/list.json')

require('superagent-proxy')(superagent)

var detail = {}
var jsq = 0

// var getData = function (url, callback) {
  superagent.get('http://www.jq22.com/jquery-info16515')
    .proxy('http://218.201.98.196:3128')
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, bres) => {
      if (err) {
        console.log('获取单页出错')
      }

      // jsq++
      // var delay = parseInt(Math.random() * 30000000 % 1000, 10)
      // console.log('当前并发数：' + jsq + '，正在爬取：' + 'test' + '，耗时：' + delay)

      var $ = cheerio.load(bres.text)
      let pageurl = $('.thumbile').find('.btn-success').attr('href')
      let id = $('.thumbile').find('.btn-success').attr('href').match(/\d{5}|\d{4}/g).toString()
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
            url: 'test',
            demo: demo,
            image: image,
            compatible: {
              ie: ie,
              all: all
            },
            time: time
          }
          // fs.appendFile('list.json', JSON.stringify(detail) + ',\n', function (err) {
          //   if (err) {
          //     console.log(err)
          //   }
          // })
          sour[id] = detail
          
          var dest = JSON.stringify(sour)
          fs.writeFile('./data/list.json',dest)
        })
      // setTimeout(function () {
      //   jsq--
      //   callback(null, url + 'Callback content')
      // }, delay)
    })
// }

// async.mapLimit(urlArrays, 1, function (url, callback) {
//   getData(url, callback)
// }, function (err, result) {
//   console.log(err)
// })




