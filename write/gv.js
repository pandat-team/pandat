//Copyright 2015 Tiffant Chen, David Giliotti, Ryan Marcus, Eden Zik
//This file is part of pandat

"use strict";

function isPlainObject(o) {
	return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
		false
		:(typeof o == 'object');
}

module.exports.convert = convert;
function convert(ir) {
	let labels = {};
	let edges = [];
	let idx = 0;

	let rconv = function(ir) {
		let newName = "a" + (idx++);


		if (isPlainObject(ir) && 'key' in ir) {
			labels[newName] = ir['key'];
		} else {
			labels[newName] = "" + ir;
			return newName;
		}
		
		if (Array.isArray(ir['children'])) {
			let children = ir['children'].map(rconv);
			children.forEach(i => {
				edges.push(newName + " -> " + i);
			});
		} else {
			let child = rconv(ir['children']);
			edges.push(newName + " -> " + child);
		}
		
		return newName;
	};

	rconv(ir);

	let toR = "digraph {\nrankdir=LR;\n";

	toR += Object.keys(labels).map(k => {
		return k + " [label=\"" + labels[k] + "\"];";
	}).join("\n") + "\n";

	toR += edges.join("\n") + "\n";

	toR += "}\n";

	return toR;
	//console.log(labels);
	//console.log(edges);
}

//var ir = {"key":"file","children":[{"key":"bob","children":7},{"key":"Jerry","children":[{"key":"Marry","children":[3,6]}]},{"key":"David","children":[4,5]}]};

//console.log(convert(ir));
