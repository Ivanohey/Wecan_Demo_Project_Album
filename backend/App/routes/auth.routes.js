const controller = require("../controllers/auth.controller"); 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Utilise la méthode signup de la classe controller
  app.post("/api/auth/signup", controller.signup);

  //Utilise la méthode signin de la classe controller
  app.post("/api/auth/signin", controller.signin);
};