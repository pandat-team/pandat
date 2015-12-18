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

function convert(ir) {

	var toR = "";
	ir = ir['children'];


	
	// extract the headers from the first row
	try {
		toR += ir[0].children.map(d => d['key']).join(",");
	} catch (e) {
		toR += "";
	}
	toR += "\n";

	toR += ir.map(row => {
		// for each row...
		if ('children' in row && Array.isArray(row['children'])) {
			return row['children'].map(child => {
				return child['children'];
			}).join(",");
		}
		return "";
	}).join("\n");

	return toR;
}

function describe(){
	return "Comma separated values";
}
