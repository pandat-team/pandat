// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

// Pandat is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//  
// Pandat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//  
// You should have received a copy of the GNU General Public License
// along with Pandat.  If not, see <http://www.gnu.org/licenses/>.


//var json = '{"bob":7, "Jerry":{"Marry":[3,6]}, "David":[4,5] }'
module.exports.convert = convert;
module.exports.describe = describe;

function convert(obj, fn) {

	var BigMap = {};
	BigMap["key"] = "file"
	BigMap["children"] = [];
	obj = JSON.parse(obj);

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

	rconvert(obj,fn);
	return BigMap;
}

function describe(){
	return "JavaScript Object Notation format";
}

//console.log(JSON.stringify(convert(json,"FileName")));
