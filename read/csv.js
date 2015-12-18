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


var csv = require("csv-parse");
var Q = require("q");

module.exports.convert = convert;
module.exports.describe = describe;

function convert(CSVfile, filename){
	// split csv file by paragraph breaks
	CSVfile = CSVfile.toString('utf8');

	return CSVToArray(CSVfile).then(function (CSVFileArrayofArrays) {

		// create the IR hash
		var IR = {
			"key": filename
		};
		
		// make children array 
		// insert csv array of arrays into separate objects in an array
		var arrayOfChildrenRows = [];
		for(var i = 1; i < CSVFileArrayofArrays.length; i++){
			var childrenObject = {
				"key": "row"
			};
			
			// make baby array 
			var arrayOfBabyRows = [];
			var babyColumnMarkerArray = CSVFileArrayofArrays[0];
			var temp = CSVFileArrayofArrays[i];
			for(var j = 0; j < temp.length; j++) {
				var babyObj = {
					"key": babyColumnMarkerArray[j],
					"children": temp[j]
				};
				arrayOfBabyRows.push(babyObj);
			}
			childrenObject["children"] = arrayOfBabyRows;
			arrayOfChildrenRows.push(childrenObject);
		}
		
		// insert array of children into IR
		IR["children"] = arrayOfChildrenRows;
		
		return IR;
	});
}


//convert("A,B,C,D\n0,1,2,3\n4,5,6,7", "data1").then(console.log);

function CSVToArray(data) {
	var toR = Q.defer();

	csv(data, function(err, d) {
		if (err) {
			toR.reject(err);
			return;
		}

		toR.resolve(d);
	});

	return toR.promise;
}

function describe(){
	return "Comma separated value file";
}
