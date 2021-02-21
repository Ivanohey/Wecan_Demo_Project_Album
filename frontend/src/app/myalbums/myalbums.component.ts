import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { MyalbumsService } from '../_services/myalbums.service';

@Component({
  selector: 'app-myalbums',
  templateUrl: './myalbums.component.html',
  styleUrls: ['./myalbums.component.css']
})
export class MyalbumsComponent implements OnInit {

  constructor(private myAlbumService: MyalbumsService, private tokenStorageService: TokenStorageService, private router: Router) { }

  connectedUserId: string;
  isLoggedIn = false;
  albumList = [];

  //Information sur les albums
  nomAlbum: string;
  descriptionAlbum:string;
  lieuAlbum:string;
  albumInfo: any= {};         //Informations de l'album en cours de modification
  newAlbumInfo: any = {};     //Informations de l'album en cours de création
  jsonAlbum: any = [];
  modAlbumNom:string;
  modAlbumId:string;
  modAlbumDesc:string;
  modAlbumLieu:string;

  //Information sur les photos
  linkNewPhoto: string;
  descNewPhoto: string;
  currentIndex: any = -1;
  showFlag: any = false;
  imageList=[];
  selectedAlbum: string;




  //Bool permettant de charger les bons composants
  actionSelected=false;
  albumSelected=false;
  creatingAlbum=false;
  actionAddPhotos=false;
  albumIsSelected=false;

  //Button save
  saveClicked=false;
  saveError=false;
  saved=false;

  ngOnInit(): void {
    //Si non connecté, rediriger vers /login
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(!this.isLoggedIn){
      this.router.navigate(['login']);
    }
    else{
      this.connectedUserId = this.tokenStorageService.getUser().id;
      this.getAlbums(this.connectedUserId);
    }
  };


  //Création de la liste d'images
  addImageAlbum(albumId, link, desc){
    let newImageObject: any = {};
    newImageObject.image = link;
    newImageObject.src = link;
    newImageObject.desc = desc;

    //Appeler méthode d'ajout dans la base de données
    this.myAlbumService.addImage(this.selectedAlbum, desc, link).subscribe(
      data=>{
        console.log("Image has been succesfully added in the database")
      },
      err =>{
        console.log(err)
      }
    )

    //Ajout de la photo dans la liste d'images existantes
    this.imageList.push(newImageObject);
  }

  //Sélectionne l'album dans lequel on ajoute des photos
  setSelectedAlbum(albumId){
    this.selectedAlbum = albumId;
    this.albumIsSelected = true;
    console.log(this.selectedAlbum);
    this.imageList=[];
    //Ajout d'images dans le tableau d'images
    this.myAlbumService.getImages(albumId).subscribe(
      data =>{
        console.log(data);
        for(let image of data.result){
          let newImageObject: any ={};
          newImageObject.image = image.lien;
          newImageObject.src = image.lien;
          newImageObject.desc = image.description;
          this.imageList.push(newImageObject);
        }
      }
    )


  }

  //Preview d'albums
  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }
  //Ferme plein ecran
  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  //Requête pour récupérer les albums
  getAlbums(idUtilisateur){
    this.myAlbumService.getAlbums(idUtilisateur).subscribe(
      data=>{
        this.jsonAlbum= data.result;
        console.log(data.result[0]);
        this.albumList=[];
        for(let album of this.jsonAlbum){
          this.albumList.push([album.id, album.nom ])
        }
      }
    )
  };

  //Charge page création d'album
  createAlbum(){
    this.albumSelected=false;
    this.creatingAlbum=true;
    this.actionSelected=true;
    this.actionAddPhotos=false;
  }


  //Creation d'un album
  saveNewAlbum(newAlbumInfo){
    this.saveClicked=true;
    this.actionSelected=true;
    newAlbumInfo.nom=this.nomAlbum;
    newAlbumInfo.description=this.descriptionAlbum;
    newAlbumInfo.lieu=this.lieuAlbum;

    var idUtilisateur=this.tokenStorageService.getUser().id;
    this.myAlbumService.createAlbum(idUtilisateur, newAlbumInfo).subscribe(
      data=>{
        this.saved=true;
        console.log(data);
        console.log("Album created");
        window.location.reload();
      },
      err => {
        if(err){
          this.saveError=true;
          console.log(err.message);
        }
      }
    )
  };


  //Charge l'outil modifications
  loadModAlbum(idModAlbum){
    //Bool chargeurs de composants
    this.creatingAlbum=false;
    this.albumSelected=true;
    this.actionAddPhotos=false;
    this.actionSelected=true;
    this.modAlbumId=idModAlbum;

    //Appelle la fonction getAlbumInfo du service myAlbumService pour charger les informations concernant l'album séléctionné.
    this.myAlbumService.getAlbumInfo(idModAlbum).subscribe(
      data => {
        const results = data.result[0];
        this.modAlbumNom = results.nom;
        this.modAlbumId = results.id;
        this.modAlbumDesc = results.description;
        this.modAlbumLieu = results.lieu;
      },
      err => {
        console.log(err.message);
      }
    )
  };

  //Envoie les nouvelles informations sur l'album séléctionné à la base de donnée
  saveModified(idAlbum, descAlbum, nomAlbum, lieuAlbum){
    this.myAlbumService.saveModified(idAlbum, descAlbum, nomAlbum, lieuAlbum).subscribe(
      data =>{
        this.saved=true;
        console.log(data.result[0]);
        window.location.reload();
      },
      err =>{
        this.saveError=true;
        console.log(err.message);
      }
    )
  };

  //Supprime l'album en cours de modification
  deleteAlbum(idAlbum){
    this.myAlbumService.deleteAlbum(idAlbum).subscribe(
      data=>{
        console.log("Album supprimé avec succès")
        console.log(data.result)
        window.location.reload();
      },
      err=>{
        console.log("L'album n'a pas pu être supprimé")
        console.log(err.message);
      }
    )
  }

  //Charge page d'ajout de photos
  loadAddPhoto(){
    this.actionSelected=true;
    this.actionAddPhotos=true;
    this.albumSelected=false;
    this.creatingAlbum=false;
    this.linkNewPhoto="";
    this.descNewPhoto="";
    this.selectedAlbum="";
    this.imageList=[];
  }

  //Réinitialise ramène à l'état initial de la page
  resetAction(){
    this.actionSelected=false;
    this.albumSelected=false;
    this.creatingAlbum=false;
    this.actionAddPhotos=false;
    this.albumIsSelected=false;
  }
}
