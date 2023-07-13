"use strict";
//Import our modules
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var app = express();
//Routers
var signUpRouter = require("./src/router/users/usersRouter.js");
var menuRouter = require("./src/router/menu/menuRouter.js");
//Set view engine. We set handlebars
var handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");
app.use(bodyParser.json());
//Server routes
//Route to the main page
app.use("/", menuRouter);
app.use("/signup", signUpRouter);
//Server listen on PORT
app.listen(PORT, function () {
    console.log("We listen port: " + PORT);
});
