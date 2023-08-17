"use strict";

function lobby(req: Request, res: Response){
  res.locals.title = "Pigeotor";
  res.render("index");
}

module.exports = {
  lobby,
}