"use strict";
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
module.exports = {
    user: process.env.DATABASEUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASEPASSWORD,
    port: process.env.PORT,
};
