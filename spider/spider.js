var http = require("http");
var fs = require('fs');
var cheerio = require("cheerio");
var iconv = require('iconv-lite');
var Promise = require('bluebird')

function download(url) {
  return new Promise(function(resolve,reject){
    http.get(url, function(res) {
      var arrBuf = [];
      var bufLength = 0;
      res.on('data', function (chunk) {
        arrBuf.push(chunk);
        bufLength += chunk.length;
      });

      res.on("end", function() {
        var chunkAll = Buffer.concat(arrBuf, bufLength);
        var strJson = iconv.decode(chunkAll,'gb2312'); // 汉字不乱码
        resolve(strJson);
      });
    }).on("error", function(e) {
      reject(e);
    });
  })

}


var url = "http://tianqi.2345.com/sichuan_dz/35.htm"

download(url).then(function(data){
  if (data) {
    // console.log(data);
    var $ = cheerio.load(data);
    $(".citychk dl").each(function(){
          $(this).children('dd').children('a').each(function(){


              var district_id = $(this).attr("href").split("/")[2].split(".")[0];
              console.log(district_id);
              fs.appendFileSync("district_id.txt",district_id+"\n");

              var request = "http://tianqi.2345.com/t/wea_history/js/201610/"+district_id+"_201610.js";

              download(request).then(function(data){
                eval(data);
                var city = weather_str.city?weather_str.city.toString():"";
                // var obj = JSON.parse(data.substring(0,data.length-1).split("=")[1]);
                weather_str.tqInfo.forEach(function(val,index,arr){
                  var time = val.ymd?val.ymd.toString():"";
                  var max_temp = val.bWendu?val.bWendu.toString():"";
                  var min_temp = val.yWendu?val.yWendu.toString():"";
                  var quality = val.aqi?val.aqi.toString():"";
                   var line_data = {
                    city:city,
                    time:time,
                    max_temp:max_temp,
                    min_temp:min_temp,
                    quality:quality
                  }
                  // console.log(line_data);
                  if(line_data.city&&line_data.time&&line_data.max_temp&&line_data.min_temp&&line_data.quality){
                    fs.appendFileSync(district_id+".txt", JSON.stringify(line_data)+"\n");
                  }

                })
                var request = "http://tianqi.2345.com/t/wea_history/js/201611/"+district_id+"_201611.js";
                return download(request);
              }).then(function(data){
                eval(data);
                var city = weather_str.city?weather_str.city.toString():"";
                // var obj = JSON.parse(data.substring(0,data.length-1).split("=")[1]);
                weather_str.tqInfo.forEach(function(val,index,arr){
                  var time = val.ymd?val.ymd.toString():"";
                  var max_temp = val.bWendu?val.bWendu.toString():"";
                  var min_temp = val.yWendu?val.yWendu.toString():"";
                  var quality = val.aqi?val.aqi.toString():"";
                   var line_data = {
                    city:city,
                    time:time,
                    max_temp:max_temp,
                    min_temp:min_temp,
                    quality:quality
                  }
                  // console.log(line_data);
                  if(line_data.city&&line_data.time&&line_data.max_temp&&line_data.min_temp&&line_data.quality){
                    fs.appendFileSync(district_id+".txt", JSON.stringify(line_data)+"\n");
                  }

                })
                var request = "http://tianqi.2345.com/t/wea_history/js/201612/"+district_id+"_201612.js";
                return download(request);
              }).then(function(data){
                eval(data);
                var city = weather_str.city?weather_str.city.toString():"";
                // var obj = JSON.parse(data.substring(0,data.length-1).split("=")[1]);
                weather_str.tqInfo.forEach(function(val,index,arr){
                  var time = val.ymd?val.ymd.toString():"";
                  var max_temp = val.bWendu?val.bWendu.toString():"";
                  var min_temp = val.yWendu?val.yWendu.toString():"";
                  var quality = val.aqi?val.aqi.toString():"";
                   var line_data = {
                    city:city,
                    time:time,
                    max_temp:max_temp,
                    min_temp:min_temp,
                    quality:quality
                  }
                  // console.log(line_data);
                  if(line_data.city&&line_data.time&&line_data.max_temp&&line_data.min_temp&&line_data.quality){
                    fs.appendFileSync(district_id+".txt", JSON.stringify(line_data)+"\n");
                  }

                })
              });

          })
    })
  }
  else console.log("error");
})
