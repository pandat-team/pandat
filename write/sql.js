// Copyright 2015 Tiffany Chen, David Giliotti, Ryan Marcus, Eden Zik
// This file is part of pandat

module.exports.convert = convert;

// convert inserts tuples into the table that are already there 
// inserts nulls when there are no values listed for a certain column
// IR structure = {"key", "filename", "children": [ {"key": "row", "children": [{"key": "a", "children": 0}, {"key": "b", "children": 12}]}]}
function convert(IR){
    var arrayOfChildrenHashes = IR["children"];
	var SQLQuery = []; 
	var SQLQueryStart = "INSERT INTO " + IR["key"] + " (" ;
	var SQLQueryStartSave = SQLQueryStart;

	// go through the array of hashes 
	for(var i = 0; i < arrayOfChildrenHashes.length; i++){
		
		var babyHash = arrayOfChildrenHashes[i];
		var babyArrayofHashes = babyHash["children"];
		
		// grab the column header names
		for (var j = 0; j < babyArrayofHashes.length; j++){
			var fetusHash = babyArrayofHashes[j];
			var value = fetusHash["key"];
			if ( !(j == babyArrayofHashes.length-1)){
				SQLQueryStart= SQLQueryStart + value + ", ";
			} else {
				SQLQueryStart = SQLQueryStart + value + ") ";
			}
		}
		
		var SQLQueryFinal = SQLQueryStart + "VALUES (";
		
		// grab the values
		for(var j = 0; j < babyArrayofHashes.length; j++){
			fetusHash = babyArrayofHashes[j];
			value = fetusHash["children"];
			// if the value is an object, just set it to null for now
			if (typeof value == 'object'){
				value = null;
			}
			// if the value is an object, don't surround in quotes
			if (typeof value == 'object'){
				SQLQueryFinal = SQLQueryFinal + value ;
			} else {
				SQLQueryFinal = SQLQueryFinal + "\""+ value+ "\"";
			}
			
			if ( !(j == babyArrayofHashes.length-1)){
				SQLQueryFinal = SQLQueryFinal + ", ";
			} else {
				SQLQueryFinal = SQLQueryFinal+ ");"
			}
		}
		// reset SQLQueryStart
		SQLQueryStart = SQLQueryStartSave;
		SQLQuery.push(SQLQueryFinal);
	}
	
	SQLQuery = SQLQuery.join("\n");	
	
	//console.log(SQLQuery);
	return SQLQuery;
}

//convert({"key": "hello", "children": [ {"key": "row", "children": [{"key": "a", "children": 0}, {"key": "b", "children": {"key": "poop", "children": "poopy"}}, {"key": "c", "children": [1, 2, 3]}, {"key": "d", "children": "hello world"}]}, {"key": "row", "children": [{"key": "a", "children": 2}, {"key": "b", "children": 77}]}]});