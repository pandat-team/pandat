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

module.exports.convert = convert;
module.exports.describe = describe;

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

function describe(){
	return "SQL insert queries";
}


//convert({"key": "hello", "children": [ {"key": "row", "children": [{"key": "a", "children": 0}, {"key": "b", "children": {"key": "poop", "children": "poopy"}}, {"key": "c", "children": [1, 2, 3]}, {"key": "d", "children": "hello world"}]}, {"key": "row", "children": [{"key": "a", "children": 2}, {"key": "b", "children": 77}]}]});
