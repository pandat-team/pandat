
// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// The file is part of pandat

// Pandat is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//  
// Pandat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//  
// You should have received a copy of the GNU General Public License
// along with Pandat.  If not, see <http://www.gnu.org/licenses/>.

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
