//Copyright 2015 Tiffant Chen, David Giliotti, Ryan Marcus, Eden Zik
//This file is part of pandat

//Test Case: var json = '{"bob":7, "Jerry":{"Marry":[3,6]}, "David":[4,5] }'

function convert(obj, fn) {
	module.exports.convert = convert;
	var BigMap = {};
	BigMap["key"] = "file"
	BigMap["children"] = [];
	obj = JSON.parse(json);

 	var rconvert = function (obj, fn) {

		var list = [];
		Object.keys(obj).map( function(item) {
			if(item in obj){
				var Map = {};
				Map["key"] = item;
				if(typeof obj[item] === "object" && !Array.isArray(obj[item])){
					Map["children"] = rconvert(obj[item],fn);
				}else{
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