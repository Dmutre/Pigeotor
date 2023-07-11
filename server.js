"use strict";
//Import our modules
var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();
//Routers
var authRouter = require("./src/router/authRouter.js");
//Set view engine. We set handlebars
var handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");
//Server routes
app.use("/", authRouter);
//Server listen on PORT
app.listen(PORT, function () {
    console.log("We listen port: " + PORT);
});
