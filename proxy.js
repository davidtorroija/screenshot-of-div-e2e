
var proxy = require('html2canvas-proxy');
var express = require('express');

var app = express();
var port = (process.env.PORT || 2002);

app.use("/", proxy());

console.log("Server proxy running on port", port);
app.listen(port);