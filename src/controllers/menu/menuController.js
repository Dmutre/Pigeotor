"use strict";
const token = require("../../middleware/JWTmiddleware.js");
function lobby(req, res) {
    //access(req, res);
    res.render("index");
}
//Function for checking correctness of our tokens
function access(req, res) {
    const { access_token, refresh_token } = req.cookies;
    const decodedAccessToken = token.verifyAccessToken(access_token);
    const decodedRefreshToken = token.verifyAccessToken(refresh_token);
    if (refresh_token === null) {
        res.redirect("/auth/login");
    }
    else if (access_token === null) {
    }
}
module.exports = {
    lobby,
};
