// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

let xlsx = require('node-xlsx');
let _ = require('lodash');

module.exports.convert = convert;
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
				return {"key": h, "value": row[idx]};
			})
		       };
	
	});

	return {"key": name, "children": values};

}



