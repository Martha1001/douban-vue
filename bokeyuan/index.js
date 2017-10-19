var http = require('http')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var async = require('async')
var fs = require('fs')

var ep = eventproxy()

var pageNum = 2
var pageUrls = []
var urlsArray = []
var catchData = []

var startDate = new Date()
var endDate = ''

//创建本地服务器
http.createServer(onRequest).listen(8888)

function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

  //获取分页
  for (var i = 1; i <= pageNum; i++) {
    pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex=' + i + '&ParentCategoryId=0')
  }

  //轮询分页
  pageUrls.forEach(function (pageUrl) {
    superagent.get(pageUrl)
      .end(function (err, pres) {
        if (err) {
          console.log('轮询分页失败')
        }
        response.write('fetch' + pageUrl + 'successful!<br/>')

        var $ = cheerio.load(pres.text)
        var curPageUrls = $('.titlelnk')

        //获取文章页
        for (var i = 0; i < curPageUrls.length; i++) {
          var curPageUrl = curPageUrls.eq(i).attr('href')
          urlsArray.push(curPageUrl)
          ep.emit('getPage', curPageUrl)
        }
      })
  })

  //ep重复监听'getPage'事件pageUrls.length*20次，所有数据都依次存在curPageUrlData数组中
  ep.after('getPage', pageUrls.length * 20, function (curPageUrlData) {
    for (var i = 0; i < curPageUrlData.length; i++) {
      // response.write('<a href="' + curPageUrlData[i] + '">' + curPageUrlData[i] + '</a>' + '<br/>')
      var data3 = curPageUrlData[i] + '\n'
      fs.appendFile('data.txt', data3, function (err) {
        if (err) {
          console.log('写入链接列表失败')
        }
      })
    }

    var jsq = 0
    var getInfo = function (url, callback) {
      superagent.get(url)
        .end((err, cres) => {
          if (err) {
            console.log('获取文章页失败')
          }

          jsq++
          var delay = parseInt(Math.random() * 30000000 % 1000, 10)
          // console.log('现在并发数为' + jsq + '，正在抓取' + url+ '，耗时' + delay +'毫秒')

          var $ = cheerio.load(cres.text)
          var infoArray = {}
          infoArray.title = $('#cb_post_title_url').text()

          var url2 = url.replace('http://www.cnblogs.com/', '')
          var zhengz = '(\S*)/p'
          var url3 = url2.match(zhengz)
          console.log(url)
          // superagent.get('http://www.cnblogs.com/mvc/blog/new.aspx?blogApp=' + url4)
          // .end((err,ares)=>{
          //   if(err){
          //     console.log('获取作者信息失败')
          //   }

          //   var $ = cheerio.load(ares.text)
          //   infoArray.name = $('#profile_block a').eq(0).text()
          //   infoArray.age = $('#profile_block a').eq(1).text()
          // })

          catchData.push(infoArray)

          setTimeout(function () {
            jsq--
            callback(null, url + 'Callback content')
          }, delay)
        })
    }

    async.mapLimit(curPageUrlData, 3, function (url, callback) {
      getInfo(url, callback)
      for (var i = 0; i < catchData.length; i++) {
        var data2 = catchData[i] + '\n'
        // fs.appendFile('data2.txt', data2, function(err){
        //   console.log('写入文件失败')
        // })
      }
    }, function (err, result) {
      console.log(err)
    })



  })

}