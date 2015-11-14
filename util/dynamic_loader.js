
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
