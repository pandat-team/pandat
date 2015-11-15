// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

module.exports.describe = describe;

function describe() {
	return "pandat's internal representation";
}


module.exports.convert = convert;
function convert(ir) {
	return JSON.stringify(ir);
}

function describe(){
	return "pandat file";
}
