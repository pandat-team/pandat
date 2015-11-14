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
	
	let rconvert = function (ir) {
		if (Array.isArray(ir)) {
			return "[" + ir.map(rconvert).join(",") + "]";
		}

		if (isPlainObject(ir)) {
			return "\"" + ir['key'] + "\": " + rconvert(ir['children']);
		}

		return ir;
	};

	return rconvert(ir['children']);

}

var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};

console.log(convert(ir));

