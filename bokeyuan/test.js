var url = 'http://www.cnblogs.com/youzhibing/p/7692366.html'

var url2 = url.replace('http://www.cnblogs.com/', '')




var url3 = url2.match(/(?=p)/)

console.log(url3)


