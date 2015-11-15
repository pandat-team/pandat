
"use strict";



let FS = require("q-io/fs");



module.exports.getReaders = getReaders;
function getReaders() {
	return FS.list("read/").then((files) => {
		return files
			.filter(f => f.endsWith("js"))
			.map((f) => f.split(".")[0]);
	});
}


module.exports.getWriters = getWriters;
function getWriters() {
	return FS.list("write/").then((files) => {
		return files
			.filter(f => f.endsWith("js"))
			.map((f) => f.split(".")[0]);
	});
}


module.exports.getReader = getReader;
function getReader(reader) {
	// TODO loading arbitrary JS!
	var toR = require("../read/" + reader + ".js");
	return toR;
}

module.exports.getWriter = getWriter;
function getWriter(writer) {
	// TODO loading arbitrary JS!
	var toR = require("../write/" + writer + ".js");
	return toR;
}
