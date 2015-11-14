// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

let argv = require('minimist')(process.argv.slice(2));
let loader = require("./util/dynamic_loader.js");
var FS = require("q-io/fs");
let _ = require("lodash");


function printUsage() {

	loader.getReaders().then(r => {
		console.log("Usage: pandat -f READER -t WRITER INPUT");
		console.log("Valid readers: " + r);
		return loader.getWriters();
	}).then(w => {
		console.log("Valid writers: " + w);
		process.exit(-1);
	}).catch(e => {
		console.log(e);
	});


}

function validateFormats(from, to) {

	return loader.getReaders().then(r => {
		console.log();
		if (! (_.includes(r, from))) {
			throw new Error(from + " is not a valid reader.");
		}

		return loader.getWriters();
	}).then(w => {
		if (! (_.includes(w, to))) {
			throw new Error(to + " is not a valid writer");
		}

		return true;
	});

}


// must include a "from"
if (! ("f" in argv)) {
	printUsage();
}

// must include a "to"
if (! ("t" in argv)) {
	printUsage();
}

// must include an input file
if (argv._.length != 1) {
	printUsage();
}

validateFormats(argv["f"], argv["t"]).then(() => {
	return FS.read(argv._[0]);
}).then(data => {
	// we have the data, load the reader and generate the IR

	// TODO we are loading arbitrary javascript!
	var reader = require("read/" + argv["f"] + ".js");
	return reader.convert(data, argv._[0]);
	
}).then(ir => {
	// now we have the IR. load the writer and
	// convert it.

	var writer = require("write/" + argv["t"] + ".js");
	return writer.convert(ir);

}).then(result => {
	// for now, just spit the writer's output to STDOUT
	console.log(result);

}).catch(e => {
	console.log(e);
	printUsage();
});
