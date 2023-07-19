"use strict";

function lobby(req: Request, res: Response){
  res.render("index");
}

module.exports = {
  lobby,
}