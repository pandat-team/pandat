// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// This file is part of pandat

module.exports.convert = convert;

function convert(CSVfile, filename){
    // split csv file by paragraph breaks
    var CSVFileArray = CSVfile.split("\n");

    // process csv file lines into arrays of elements
    var CSVFileArrayofArrays = [];
    for (var i = 0; i < CSVFileArray.length; i++) {
	console.log( CSVToArray(CSVFileArray[i])[0]);
	CSVFileArrayofArrays[i] = CSVToArray(CSVFileArray[i])[0];
    }

    // create the IR hash
    var IR = {
	"key": filename
    }

    // make children array 
    // insert csv array of arrays into separate objects in an array
    var arrayOfChildrenRows = []
    for(var i = 1; i < CSVFileArrayofArrays.length; i++){
	var childrenObject = {
	    "key": "row"
	}

	// make baby array 
	var arrayOfBabyRows = [];
	var babyColumnMarkerArray = CSVFileArrayofArrays[0];
	var temp = CSVFileArrayofArrays[i];
	for(var j = 0; j < temp.length; j++) {
	    var babyObj = {
		"key": babyColumnMarkerArray[j],
		"value": temp[j]
	    }
	    arrayOfBabyRows.push(babyObj);
	}
	childrenObject["children"] = arrayOfBabyRows;
	arrayOfChildrenRows.push(childrenObject);
    }

    // insert array of children into IR
    IR["children"] = arrayOfChildrenRows;
    console.log(JSON.stringify(IR));
}

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
        ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

//convertFile("A,B,C,D\n0,1,2,3\n4,5,6,7", "data1"); 
