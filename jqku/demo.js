var str = "background:url(images/t1.jpg) top center no-repeat;";
console.log(str.substring(str.indexOf("background:url(")+15,str.indexOf(")")))