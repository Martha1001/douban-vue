var http = require('http')
var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')
var fs = require('fs')

var ep = eventproxy()
require('superagent-proxy')(superagent)
var dlIp = {}

//开心代理
var kxPageNum = 10
var kxUrls = []

for (var i = 1; i <= kxPageNum; i++) {
  kxUrls.push('http://www.kxdaili.com/dailiip/1/' + i + '.html#ip')
}

kxUrls.forEach(function (kxUrl) {
  superagent.get(kxUrl)
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .end((err, kres) => {
      if (err) {
        console.log(err)
      }

      var $ = cheerio.load(kres.text)
      for (var i = 0; i < 10; i++) {
        var kxIp = $('tbody tr').eq(i).find('td').first().text()
        var kxPort = $('tbody tr').eq(i).find('td').eq(1).text()
        var kxDl = kxIp + ':' + kxPort
        ep.emit('kxTest', kxDl)
      }
    })
})

ep.after('kxTest', kxPageNum * 10, function (kxDls) {
  kxDls.forEach(function (kxDl) {
    var testIp = 'http://' + kxDl
    fs.appendFile('/proxy/ip.txt', '开心代理 ' + testIp + ',\n', function (err) {
      if (err) {
        console.log(err)
      }
    })
    superagent.get('http://ip.chinaz.com/getip.aspx')
      .proxy(testIp)
      .timeout(3000)
      .end((err, ktres) => {
        if (ktres === undefined) {
          console.log(testIp + '已失效')
          return
        } else {
          dlIp.name = '开心代理'
          dlIp.url = testIp
          fs.appendFile('/proxy/ip.json', JSON.stringify(dlIp) + ',\n', function (err) {
            if (err) {
              console.log('开心代理写入文件失败')
            }
          })
        }
      })
  })
})


//西刺代理
var xcPageNum = 10
var xcUrls = []

for (var i = 1; i <= xcPageNum; i++) {
  xcUrls.push('http://www.xicidaili.com/nn/' + i)
}

xcUrls.forEach(function (xcUrl) {
  superagent.get(xcUrl)
    .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    .set('Cookie','_free_proxy_session=BAh7B0kiD3Nlc3Npb25faWQGOgZFVEkiJWIxZWQ3ZjNiMTNkMTg5MmE1MmRmNmVjNTVhOGVkNjExBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMXdrVFE0SnZDNWEzcGtnM3J0eHFOSXowYW9ISzVzemxPNmp5eGk0WTRZM2c9BjsARg%3D%3D--c93f5b5d67ed4caeb0d5c1e20b4ec973df72c500; Hm_lvt_0cf76c77469e965d2957f0553e6ecf59=1508896272,1508896444; Hm_lpvt_0cf76c77469e965d2957f0553e6ecf59=1508917107')
    .end((err, xres) => {
      if (err) {
        console.log(err)
      }

      var $ = cheerio.load(xres.text)
      for (var i = 1; i < 100; i++) {
        var xcIp = $('#ip_list tr').eq(i).find('td').eq(1).text()
        var xcPort = $('#ip_list tr').eq(i).find('td').eq(2).text()
        var xcDl = xcIp + ':' + xcPort
        ep.emit('xcTest', xcDl)
      }
    })
})

ep.after('xcTest', xcPageNum * 99, function (xcDls) {
  xcDls.forEach(function (xcDl) {
    var testIp = 'http://' + xcDl
    fs.appendFile('/proxy/ip.txt', '西刺代理 ' + testIp + ',\n', function (err) {
      if (err) {
        console.log(err)
      }
    })
    superagent.get('http://ip.chinaz.com/getip.aspx')
      .proxy(testIp)
      .timeout(3000)
      .end((err, xtres) => {
        if (xtres === undefined) {
          console.log(testIp + '已失效')
          return
        } else {
          dlIp.name = '西刺代理'
          dlIp.url = testIp
          fs.appendFile('/proxy/ip.json', JSON.stringify(dlIp) + ',\n', function (err, ) {
            if (err) {
              console.log('西刺代理写入文件失败')
            }
          })
        }
      })
  })
})

