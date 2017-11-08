var str = 'background:  center center no-repeaturl("img/a22.png")'
var str1 = "background:  center center no-repeaturl('img/a23.png')"
// var substr = str.match(/url\('(\S*)'\)|url\("(\S*)"\)/)
var substr = str.match(/url\((?=\'|\")[\S]*(?=\)'|\)")?/)
console.log(substr)