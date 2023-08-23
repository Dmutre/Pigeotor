"use strict";

//Import our modules
const express = require("express");
const exphbs  = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const methodOverride = require("method-override");


const PORT = process.env.PORT || 3000;
const app = express();

//Middlewares
const { authenticateToken } = require("./src/middleware/JWTmiddleware");

//Routers
const authRouter = require("./src/router/users/usersRouter");
const menuRouter = require("./src/router/menu/menuRouter");

//Set view engine and others packages for server, as cookie and body parsers.
const handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


//Use middleware
app.use(authenticateToken);

//Server routes

//Route to the main page
app.use("/", menuRouter);
app.use("/auth", authRouter);

//Server listen on PORT
app.listen(PORT, () => {
  console.log("We listen port: " + PORT);
});