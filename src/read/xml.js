//Copyright 2015 Tiffany Chen, David Gilotti, Ryan Marcus, Eden Zik
//This file is part of Pandat
function convert(string, opt) {

        var _ = require("lodash");
        var DOMParser = require('xmldom').DOMParser;
        var doc = new DOMParser().parseFromString(string);
        function parse(node){
                //console.log(node.constructor.name);
                function key(node){
                        return node.tagName;
                }
                function attrs(node){
                        result = {};
                        _.values(node.attributes).map(
                                        function(item){
                                                if (item.name != undefined){
                                                        result[item.name] = item.value;
                                                }

                                        });
                        if (_.values(result).length === 0) {
                                return undefined;
                        }
                        return result;
                }
                function value(node){
                        return node.data;
                }
                function children(node){
                        if (_.isEmpty(node.childNodes)) return undefined;
                        return _.values(node.childNodes).map(
                                        function(item){
                                                switch(item.constructor.name){
                                                        case 'Text': return value(item);
                                                        case 'Document': return parse(item);
                                                        case 'Element': return parse(item);
                                                        default: return undefined;
                                                }

                                        }).filter(function(item){
                                return !_.isEmpty(item);      
                        });
                }
                return {
                        "key"           :       key(node),
                        "attrs"         :       attrs(node),
                        "children"      :       children(node)       
                }
        }
        return parse(doc);
}




// Some basic unit tests
//
fs = require('fs');
fs.readFile('./test/read/xml/data/simple.xml', 'utf8', function (err,data) {
        if (err) {
                return console.log(err);
        }
        console.log(JSON.stringify(convert(data)));
});

