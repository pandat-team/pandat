// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat


module.exports.convert = convert;
function convert(ir) {

	var toR = "";
	ir = ir['children'];


	
	// extract the headers from the first row
	toR += ir[0].children.map(d => d['key']).join(",");
	toR += "\n";

	toR += ir.map(row => {
		// for each row...
		return row['children'].map(child => {
			return child['children'];
		}).join(",");
	}).join("\n");

	return toR;
}
