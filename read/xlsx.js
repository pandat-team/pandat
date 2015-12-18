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

let xlsx = require('node-xlsx');
let _ = require('lodash');

function convert(excel, filename, options) {
	//let data = xlsx.parse("/Users/ryan/projects/pandat/test/inputs/excel/data1.xlsx");
	let data = xlsx.parse(excel)[0];

	// TODO convert more than the first sheet (remove [0]) above
	let name = data["name"];
	let header = _.first(data['data']);
	let values = _.rest(data['data']);

	values = values.map(row => {
		return {"key": "row",
			"children": header.map((h, idx) => {
				return {"key": h, "children": row[idx]};
			})
		       };
	
	});

	return {"key": name, "children": values};

}

function describe(){
	return "Excel file";
}

