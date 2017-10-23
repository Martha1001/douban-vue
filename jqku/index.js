var http = require('http')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var async = require('async')
var fs = require('fs')

var ep = eventproxy()

var pageNum = 1
// var pageUrls = []
var dataList = []
var detail = {
  id: '',
  title: '',
  summary: '',
  type: [],
  url: '',
  demo: '',
  img: '',
  compatible: {
    ie: '',
    all: '',
  },
  time: ''
}

// 创建本地服务器
// http.createServer(onRequest).listen(8888)

// function onRequest(request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
// }
function getList() {
  superagent.get('http://www.jq22.com/jq' + pageNum + '-jq')
    .end((err, res) => {
      var $ = cheerio.load(res.text)
      for (var i = 1; i < 16; i++) {
        var links = $('.cover-info').eq(i)
        detail.url = 'http://www.jq22.com/' + links.children('a').attr('href')
        detail.id = detail.url
        detail.title = links.find('h4').text()
        detail.summary = links.find('small').text()
        var dataList = JSON.stringify(detail) + ',' + '\n'
        fs.appendFile('list.json', dataList, function (err) {
          if (err) {
            console.log(err)
          }
        })
        ep.emit('getNext', $)
      }
    })
}
ep.after('getNext')

getList()

