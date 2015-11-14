//Copyright 2015 Tiffany Chen, David Gilotti, Ryan Marcus, Eden Zik
//This file is part of Pandat

function convert(string, opt) {
        console.log("hello");
}

convert("moo");
fs = require('fs');
fs.readFile('./test/read/xml/data/cd_catalog.xml', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

