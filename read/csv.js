// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// This file is part of pandat

var csv = require("csv-parse");
var Q = require("q");

module.exports.convert = convert;

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

