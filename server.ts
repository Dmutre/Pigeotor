"use strict";

//Import our modules
const express = require("express");
const exphbs  = require("express-handlebars");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();

//Routers
const signUpRouter = require("./src/router/users/usersRouter.js");

//Set view engine. We set handlebars
const handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");
app.use(bodyParser.json());

//Server routes
app.use("/signup", signUpRouter);

//Server listen on PORT
app.listen(PORT, () => {
  console.log("We listen port: " + PORT);
});