//Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
//This file is part of pandat

var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};

module.exports.convert = convert;
function convert(IR) {
	var BigMap = {};
	obj = IR;
	obj = obj["children"];
	//console.log(obj);

 	var rconvert = function (obj) {

 		
 
 		for(list in obj){
			
 			var Map = {};
 			

			if(typeof obj[list]['children'] === "object" && Array.isArray(obj[list]['children']) && typeof obj[list]['children'][0] === "object"  ){
				console.log("KEY: " + obj[list]['key'] + " VALUE: " + JSON.stringify(obj[list]['children']));
				ret = obj[list]['children'];
				Map[obj[list]['children']] = obj[list]['children'];
				BigMap[obj[list]['key']] = rconvert(obj[list]['children']);
			}else{
				console.log("Entering This " + JSON.stringify(obj[list]['children']));
				BigMap[obj[list]['key']] = obj[list]['children'];
			}

			
 			
 		}

 		//console.log((typeof IR) + " , " + JSON.stringify(IR));

		return Map;

	};

	rconvert(obj);
	return BigMap;
}

console.log('Answer: ' + JSON.stringify(convert(ir)));