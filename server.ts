"use strict";

//Import our modules
const express = require("express");
const exphbs  = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();

//Routers
const authRouter = require("./src/router/auth/authRouter.js");

//Set view engine. We set handlebars
const handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");

//Server routes
app.use("/", authRouter);

//Server listen on PORT
app.listen(PORT, () => {
  console.log("We listen port: " + PORT);
});