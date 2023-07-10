"use strict";

//Import our modules
const express = require("express");
const exphbs  = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();

//Routers
const authRouter = require("./src/router/authRouter.js");

//Set view engine. We set handlebars
const handlebars = exphbs.create({ extname: '.hbs', defaultLayout: "layout" });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set("views", "./src/views");
app.set("layout", "layout");


app.use("/", authRouter);

app.listen(PORT, () => {
  console.log("We listen port: " + PORT);
});