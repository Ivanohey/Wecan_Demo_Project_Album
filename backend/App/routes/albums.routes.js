const controller = require("../controllers/albums.controller"); 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.post("/getInfoAlbum", controller.getInfoAlbum);
  app.post("/saveModified", controller.saveModified);
  app.post("/deleteAlbum", controller.deleteAlbum);
  app.post("/myalbums/getAlbums", controller.getAlbums);
  app.post("/myalbums/createAlbum", controller.createAlbums);
  app.post("/myalbums/addImage", controller.addImage);
  app.post("/myalbums/getImages", controller.getImages);
  app.post("/myalbums/getSharedAlbums", controller.getSharedAlbums);
  app.post("/myalbums/shareAlbum", controller.shareAlbum);

}

