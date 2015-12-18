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

"use strict";

module.exports.convert = convert;
module.exports.describe = describe;

function isPlainObject(o) {
	return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
		false
		:(typeof o == 'object');
}

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
	return "Extensible Markup Language";
}



/*var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};


console.log(JSON.stringify(ir));
console.log(convert(ir));*/
