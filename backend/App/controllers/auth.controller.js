const authConfig = require("../config/auth.config");
const mySqlConnection = require("../config/mysql.connection.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


//Exporte la méthode signup (est utilisée pour l'inscription de l'utilisateur)
exports.signup = (req, res) => {      
  var sql = "SELECT * FROM utilisateurs WHERE utilisateurs.pseudo = (?)";
  var userPseudo = req.body.pseudo;
  mySqlConnection.query(sql, [userPseudo], function (err, result, fields) {
    if (err) throw err;

    //On vérifie si le pseudo est déjà utilisé par un autre utilisateur
    if(result[0]) {
        res.status(400).send({
        message: "Failed! Pseudo is already used!"
      });
      return;
    } 
    else {
     
      //Si le pseudo est libre, on insere les valeurs reçues dans la base de données
      var sql_request = "INSERT INTO utilisateurs (pseudo, password, nom, prenom) VALUES (?)";
      var values = [req.body.pseudo,                            //Pseudo
                    bcrypt.hashSync(req.body.password, 8),      //Mot de passe encrypté retourné par la fonction hashSync de bcrypt
                    req.body.last_name,                         //Nom de famille
                    req.body.first_name,                        //Prénom
                  ];
        mySqlConnection.query(sql_request, [values], function(error, results) {
        if(error) throw error;
        //On envoie un message de confirmation en réponse au service d'authentification
        res.send({ message: "User registered successfully!" });
      });
    }
  });
}

//Méthode signin utilisée pour s'inscrire
exports.signin = (req, res) => {
  var sql = "SELECT * FROM utilisateurs WHERE pseudo = (?)";
  var userPseudo = req.body.pseudo;

  //On vérifie si le pseudo entré par l'utilisateur existe dans la base de données
  mySqlConnection.query(sql, [userPseudo], function (err, result, fields) {
      if (err) throw err;
      if(!result[0]) {
        console.log("User not found")
        return res.status(404).send({ message: "User Not found." });
      }
      
      //On compare les mot de passes en utilisant la methode compareSync de bcrypt, retourne un bool (true si pareil, false si différents)
      var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
      
      //Si le mdp est faux, on retourne l'erreur et on 
      if (!passwordIsValid) {
        console.log("Login failed: invalid password");
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      else{
        console.log("Password correct, logging in.")
      }
      //On crèe un token signé avec l'id de l'utilisateur
      var token = jwt.sign({ id: result[0].id }, authConfig.secret, {
        expiresIn: 86400 // 24 hours
      });

      //On renvoie la réponse
      res.status(200).send({
        id: result[0].id,
        pseudo: result[0].pseudo,
        first_name: result[0].prenom,
        last_name: result[0].nom,
        accessToken: token
      });
    });
}