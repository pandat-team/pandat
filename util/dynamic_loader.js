
"use strict";



let FS = require("q-io/fs");
let Q = require("q");

let readers = {
	"csv": require("../read/csv.js"),
	"json": require("../read/json.js"),
	"xlsx": require("../read/xlsx.js"),
	"xml": require("../read/xml.js")
};

let writers = {
	"csv": require("../write/csv.js"),
	"gv": require("../write/gv.js"),
	"json": require("../write/json.js"),
	"pandat": require("../write/pandat.js"),
	"sql": require("../write/sql.js"),
	"xml": require("../write/xml.js")
};


module.exports.getReaders = getReaders;
function getReaders() {
	return Q(Object.keys(readers));
}


module.exports.getWriters = getWriters;
function getWriters() {
	return Q(Object.keys(writers));
}


module.exports.getReader = getReader;
function getReader(reader) {
	return readers[reader];
	
}

module.exports.getWriter = getWriter;
function getWriter(writer) {
	return writers[writer];
}
