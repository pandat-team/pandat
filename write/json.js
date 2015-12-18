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
	
	let rconvert = function (ir) {
		if (Array.isArray(ir)) {
			// is it an array of plain objects?
			if (ir.every(isPlainObject)) {
				return "{" + ir.map(rconvert).join(",") + "}";
			} else {
				return JSON.stringify(ir);
			}
		}

		if (isPlainObject(ir)) {
			return "\"" + ir['key'] + "\": " + rconvert(ir['children']);
		}

		return '"' + ir + '"';
	};

	return rconvert(ir['children']);

}

function describe(){
	return "JavaScript Object Notation format";
}


//var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};

//console.log(convert(ir));

