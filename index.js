#! /usr/bin/env node

// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

"use strict";

let argv = require('minimist')(process.argv.slice(2));
let loader = require("./util/dynamic_loader.js");
let FS = require("q-io/fs");
let _ = require("lodash");


function printUsage() {

	return loader.getReaders().then(r => {
		console.log("Usage: pandat -f READER -t WRITER INPUT");
		console.log("Valid readers: " + r);
		return loader.getWriters();
	}).then(w => {
		console.log("Valid writers: " + w);
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
let err = false;
if (! ("f" in argv)) {
	printUsage().then(() => process.exit(-1));
	err = true;
}

// must include a "to"
if (!err && ! ("t" in argv)) {
	printUsage().then(() => process.exit(-1));
	err = true;
}

// must include an input file
if (!err && argv._.length != 1) {
	printUsage().then(() => process.exit(-1));
	err = true;
}

if (!err) {


	validateFormats(argv["f"], argv["t"]).then(() => {
		return FS.read(argv._[0], "b");
	}).then(data => {
		// we have the data, load the reader and generate the IR

		// TODO we are loading arbitrary javascript!
		var reader = require("./read/" + argv["f"] + ".js");
		return reader.convert(data, argv._[0]);
		
	}).then(ir => {
		// now we have the IR. load the writer and
		// convert it.


		var writer = require("./write/" + argv["t"] + ".js");
		return writer.convert(ir);

	}).then(result => {
		// for now, just spit the writer's output to STDOUT
		console.log(result);

	}).catch(e => {
		//console.log(e);
		console.log(e.stack);
		printUsage();
	});

}
