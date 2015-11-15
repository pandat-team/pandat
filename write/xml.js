// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

function isPlainObject(o) {
	return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
		false
		:(typeof o == 'object');
}

module.exports.convert = convert;
function convert(ir) {


	function rconvert(ir) {
		var toR = "";
		
		if (!isPlainObject(ir)) {
			toR += "<data>" + ir + "</data>";
			return toR;
		}

		toR += "<" + ir['key'];
		if ("attr" in ir) {
			toR += Object.keys(ir['attr']).map(k => {
				return k + "=\"" + ir['attr'][k] + "\"";
			}).join(" ");
		}
		toR += ">";


		if (Array.isArray(ir['children'])) {
			toR += ir['children'].map(child => {
				return rconvert(child);
			}).join("\n");
		} else {
			toR += ir['children'];
		}

		toR += "</" + ir['key'] + ">";


		return toR;
	};


	return rconvert(ir);

	
}

function describe(){
	return "XML file";
}



/*var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};


console.log(JSON.stringify(ir));
console.log(convert(ir));*/
