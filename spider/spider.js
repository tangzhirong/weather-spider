var http = require("http");
var fs = require('fs');
var cheerio = require("cheerio");


function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var url = "http://tianqi.2345.com/sichuan_dz/35.htm"
 

download(url, function(data) {
  if (data) {
    // console.log(data);
    var $ = cheerio.load(data);
    $(".citychk dl").each(function(){
          $(this).children('dd').children('a').each(function(){
            // var history_url = "http://tianqi.2345.com/wea_history/"+$(this).attr("href").split("/")[2];
            // console.log(history_url);
            var district_id = $(this).attr("href").split("/")[2].split(".")[0];
            console.log(district_id);
            var timeArr = [10,11,12];
            timeArr.forEach(function(val,index){
                    var request = "http://tianqi.2345.com/t/wea_history/js/2016"+val+"/"+district_id+"_2016"+val+".js";
            download(request,function(data){
                  eval(data);
                  var city = weather_str.city;
                  // var obj = JSON.parse(data.substring(0,data.length-1).split("=")[1]);
                  weather_str.tqInfo.forEach(function(val,index,arr){
                    var time = val.ymd;
                    var max_temp = val.bWendu;
                    var min_temp = val.yWendu;
                    var quality = val.aqi;
                     var line_data = {
                      city:city,
                      time:time,
                      max_temp:max_temp,
                      min_temp:min_temp,
                      quality:quality
                    }
                    // console.log(line_data);
                    fs.appendFile("out.txt", JSON.stringify(line_data)+"\n", function(err) {
                              if(err) {
                                  return console.log(err);
                              }
                           
                              console.log("The file was saved!");
                          });
                  })
                 })
            })
            
          })
    })
  }
  else console.log("error");  
});

