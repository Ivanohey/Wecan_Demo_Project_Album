const mySqlConnection = require("../config/mysql.connection.js");

//Renvoie tous les albums correspondant à un utilisateur
exports.getAlbums = (req, res) =>{
    const idUtilisateur= req.body.id
    sql="SELECT * FROM albums WHERE idUtilisateur=?"
    mySqlConnection.query(sql, idUtilisateur, function(err, result, fields){
        if(err) throw err;
        if(result)
        return res.send({result});
    })
}

//Insère un nouvel album dans la table albums
exports.createAlbums = (req, res) =>{
    console.log(req.body)
    const idUtilisateur = req.body.idUtilisateur;
    const nom = req.body.nom;
    const description = req.body.description;
    const lieu = req.body.lieu;

    sql="INSERT INTO albums (idUtilisateur, nom, description, lieu) VALUES (?,?,?,?)";
    mySqlConnection.query(sql, [idUtilisateur, nom, description, lieu], function(err, result, fields){
        if(err) throw err;
        if(result){
            console.log(result);
            res.send({result})
        }
    })

}

//Renvoie toutes les informations concernant un album
exports.getInfoAlbum = (req, res) =>{
    console.log(req.body);
    sql="SELECT * FROM albums WHERE albums.id=?"
    mySqlConnection.query(sql, [req.body.id], function(err, result, fields){
        if(err) throw err;
        if(result){
            console.log(result);
            res.send({result});
        }
    })

};

//Met à jour un album de la table albums identifé par son id
exports.saveModified = (req, res) => {
    sql="UPDATE albums SET albums.nom=?, albums.description =?, albums.lieu =? WHERE albums.id=?"
    mySqlConnection.query(sql, [req.body.nom, req.body.description, req.body.lieu, req.body.id], function(err, result, fields){
        if(err) throw err;
        if(result){
            console.log(result)
            res.send({result})
        }
    })
};

//Supprime l'album identifié par l'id reçu
exports.deleteAlbum = (req, res) =>{
    sqlDeleteAlbum="DELETE FROM albums WHERE albums.id=?"
    sqlDeletePictures="DELETE FROM images WHERE idAlbum = ?"
    sqlDeleteShared="DELETE FROM album_visiteur WHERE idAlbum = ?"
    //On supprime le partage de l'album
    mySqlConnection.query(sqlDeleteShared, req.body.id, function(err, result, fields){
        if (err) throw err;
        if (result){
            //On supprime les photos puis l'album
            mySqlConnection.query(sqlDeletePictures, req.body.id, function(err, result, fields){
                if(err) throw err;
                if(result){
                    //Si les photos sont bien supprimées, on supprime l'album
                    mySqlConnection.query(sqlDeleteAlbum, req.body.id, function(err, result, fields){
                        if(err) throw err;
                        if(result){
                            console.log("Album supprimé avec succès");
                            res.send({result});
                        }
                    })
                }
            })  
        }
    })
    
};

//Ajouter une photo dans la base de données
exports.addImage = (req, res) =>{
    let idAlbum = req.body.idAlbum;
    let description = req.body.description;
    let lien = req.body.src;
    sql = "INSERT INTO images (idAlbum, description, lien) VALUES (?,?,?)"
    mySqlConnection.query(sql, [idAlbum, description, lien], function(err, result, fields){
        if(err) throw err;
        if(result){
            console.log(result)
            res.send({result});
        }
    }) 
}

//On récupère toutes les images faisant partie d'un album
exports.getImages = (req, res) => {
    let idAlbum = req.body.idAlbum;
    sql = "SELECT * FROM images WHERE images.idAlbum = ?"
    mySqlConnection.query(sql, idAlbum, function(err, result, fiels){
        if (err) throw err;
        if (result){
            console.log(result);
            res.send({result});
        }
    })
}


//On récupère tous les albums partagés à un utilisateur
exports.getSharedAlbums = (req, res) => {
    let idUtilisateur = req.body.idUtilisateur;
    sql = "SELECT * FROM albums WHERE albums.id IN (SELECT idAlbum FROM album_visiteur WHERE idUtilisateur = ?)"
    mySqlConnection.query(sql, idUtilisateur, function(err, result, fields){
        if(err) throw err;
        if(result){
            console.log(result);
            res.send({result})
        }
    })
}

exports.shareAlbum = (req, res) => {
    let idAlbum = req.body.idAlbum;
    let pseudo = req.body.pseudoUtilisateur;

    //On vérifie d'abord si l'utilisateur existe
    sqlName = "SELECT id FROM utilisateurs WHERE utilisateurs.pseudo = ? "
    mySqlConnection.query(sqlName, pseudo, function(err, resultName, fields){
        if(err) throw err;

        //On vérifie si la réponse n'est pas un tableau vide
        if (resultName.length >0){
            //Si l'utilsateur existe, on ajoute l'album dans les albums partagés
            console.log("SELECT:" + resultName[0].id);
            idUtilisateur = resultName[0].id;
            console.log("Ajout de l'album dans les albums partagés")
            sql = "INSERT IGNORE INTO album_visiteur (idAlbum, idUtilisateur) VALUES (?, ?)"
            mySqlConnection.query(sql, [idAlbum, idUtilisateur], function(err, result, fields){
                if (err) throw err;
                if (result){
                    console.log(result);
                    res.send({result});
                }
             })
        }
        else{
            console.log("L'utilisateur spécifié n'existe pas");
            res.send("NoUser")
        }
    })        
} 
