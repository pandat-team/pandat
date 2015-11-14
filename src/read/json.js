//Copyright 2015 Tiffant Chen, David Giliotti, Ryan Marcus, Eden Zik
//This file is part of pandat

//var json = '{"bob":7, "Jerry":{"Marry":[3,6]}, "David":[4,5] }'
module.exports.convert = convert;
function convert(obj, fn) {

	var BigMap = {};
	BigMap["key"] = "file"
	BigMap["children"] = [];
	obj = JSON.parse(json);

 	var rconvert = function (obj, fn) {

		var list = [];
		if(obj == null){
			return list;
		}
		Object.keys(obj).map( function(item) {
			if(item in obj){
				var Map = {};
				Map["key"] = item;
				if(typeof obj[item] === "object" && !Array.isArray(obj[item])){
					Map["children"] = rconvert(obj[item],fn);
				}else if (Array.isArray(obj[item]) && typeof obj[item][0] === "object"){
					for(i in obj[item]){
						Map["children"] = rconvert(obj[item][i],fn);
					}	
				}
				else{
					Map["children"] = obj[item];
				}
				list.push(Map);
	     	}
		})

		BigMap["children"] = list;
		return list;
	};

	rconvert(obj,"FileName");
	return BigMap;
}

//console.log(JSON.stringify(convert(json,"FileName")));