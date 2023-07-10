"use strict";
var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();
app.engine("handlebars", exphbs({
    layoutsDir: __dirname + '/src/views/layout',
}));
app.set("view engine", "handlebars");
app.listen(PORT, function () {
    console.log("We listen port: " + PORT);
});
