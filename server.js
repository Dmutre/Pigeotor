"use strict";
//Import our modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const app = express();
//Routers
const authUpRouter = require("./src/router/users/usersRouter.js");
const menuRouter = require("./src/router/menu/menuRouter.js");
//Set view engine. We set handlebars
const handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//Server routes
//Route to the main page
app.use("/", menuRouter);
app.use("/auth", authUpRouter);
//Server listen on PORT
app.listen(PORT, () => {
    console.log("We listen port: " + PORT);
});
