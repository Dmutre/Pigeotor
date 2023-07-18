"use strict";

const token = require("../../middleware/JWTmiddleware.js");

function lobby(req: any, res: any){
  //access(req, res);

  res.render("index");
}

//Function for checking correctness of our tokens
function access(req: any, res: any) {
  const { access_token, refresh_token }:
  { access_token: string, refresh_token: string} = req.cookies;

  const decodedAccessToken: any = token.verifyAccessToken(access_token);
  const decodedRefreshToken: any = token.verifyAccessToken(refresh_token);

  if(refresh_token === null) {
    res.redirect("/auth/login");
  } else if(access_token === null) {
    
  }
}

module.exports = {
  lobby,
}