// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

module.exports.convert = convert;
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
	return "CSVs file";
}
