var fs = require('fs');
// var lineReader = require('line-reader');
var Promise = require('bluebird');
var LineByLine = require('./readLineSync');

var filename = './district_id.txt';  
var liner = new LineByLine( filename );  
var theline;  
var num =0;
while( !liner.EOF() )  
{  
   theline = liner.next();  
   filename = "./"+theline+".txt";
   var liner2 = new LineByLine( filename );  
  
   var i=0;
   while(i<=91){
   	theline = liner2.next();  
   	if(theline!=undefined){
   		// console.log(theline);
   		var lineobj = JSON.parse(theline);
	   	var max_temp = parseInt(lineobj.max_temp.substring(0,lineobj.max_temp.length-1));
	   	console.log(max_temp);
	   	if(i!=91){
	   		fs.appendFileSync("out.txt", max_temp+" ");
	   	}else{
	   		fs.appendFileSync("out.txt", max_temp+"\n");
	   	}
	   	
   		 
   	}else{
   		num--;
   		break;
   	}
   	i++;
   	// var lineobj = JSON.parse(theline);
   	// var max_temp = parseInt(lineobj.max_temp.substring(0,lineobj.max_temp.length-1));
   	// console.log(max_temp);

   }
   num++;
}  
console.log(num);
liner.close();  
