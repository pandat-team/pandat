//Copyright 2015 Tiffany Chen, David Gilotti, Ryan Marcus, Eden Zik
//This file is part of Pandat


module.exports = {
        convert: function(buffer, opt) {

                var _ = require("lodash");
                var DOMParser = require('xmldom').DOMParser;
                var doc = new DOMParser().parseFromString(buffer.toString());
                function parse(node){
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
                                return node.data.trim();
                        }
                        function children(node){
                                if (_.isEmpty(node.childNodes)) return undefined;
                                values = _.values(node.childNodes).filter(function(item){
                                        return !_.isEmpty(item);
                                });
                                if (values.length == 1){
                                        if (values[0].constructor.name == 'Text'){
                                                return value(values[0]);
                                        }
                                }
                                return values.map(
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
                        };
                }
                return parse(doc).children;  // grab only the first root element
        },
		
		describe: function(){
			return "Extensible Markup Language";
		}
}



