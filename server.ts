"use strict";

const express = require("express");
const exphbs  = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();

app.engine("handlebars", exphbs({
  layoutsDir: __dirname + '/src/views/layout',
}));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log("We listen port: " + PORT);
});