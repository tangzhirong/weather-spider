var fs = require('fs');

for(var i =0;i<157;i++){
	for(var j=0;j<92;j++){
		var num = Math.round(Math.random());
		// var num =1;
		if(j!=91){
			fs.appendFileSync("onezero-Matrix.txt", num+" ");
		}else{
			fs.appendFileSync("onezero-Matrix.txt", num+"\n");
		}
		
	}
}