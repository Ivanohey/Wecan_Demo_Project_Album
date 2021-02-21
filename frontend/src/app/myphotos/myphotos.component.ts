import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { MyalbumsService } from '../_services/myalbums.service';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.component.html',
  styleUrls: ['./myphotos.component.css']
})
export class MyphotosComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private myAlbumService: MyalbumsService, private router: Router) { }

  connectedUserId: string;
  isLoggedIn = false;
  albumList = [];
  sharedAlbumList = [];
  currentIndex: any = -1;
  showFlag: any = false;
  imageList=[];
  selectedAlbum: string;
  sharingAlbum=false;
  inGallery=false;
  inSharedGallery;
  selectedUser: string;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    if(this.isLoggedIn){
      this.connectedUserId = this.tokenStorageService.getUser().id;
      console.log("ID utilisateur connecté: " + this.connectedUserId);

      //Récupère les albums créés par l'utilisateur connecté
      this.myAlbumService.getAlbums(this.connectedUserId).subscribe(
        data=>{
          this.albumList = [];
          console.log(data.result);
          for(let album of data.result){
            this.albumList.push([album.id, album.nom])
          }
        },
        err=>{
          console.log(err.message)
        }
      );

      //Récupre les albums partagés à l'utilisateur connecté
      this.myAlbumService.getSharedAlbums(this.connectedUserId).subscribe(
        data=>{
          this.sharedAlbumList =[];
          console.log(data.result);
          for(let album of data.result){
            this.sharedAlbumList.push([album.id, album.nom])
          }
        },
        err=>{
          console.log(err.message)
        }
      );
    }
    else{
      console.log("User not logged-in")
      this.router.navigate(['login']);        //Si pas connecté, redirige vers /login
    }
  }

  //Sélectionne l'album dans lequel on ajoute des photos
  setSelectedAlbum(albumId){
    this.inGallery=true;
    this.inSharedGallery=false;
    this.selectedAlbum = albumId;
    console.log("Album séléctionné: "+ this.selectedAlbum);
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
  };

  //Sélectionne les albums partagés
  setSharedSelectedAlbum(albumId){
    this.inGallery=false;
    this.inSharedGallery=true;
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



  loadShareAlbum(idAlbum){
    this.sharingAlbum=true;
    this.inGallery=false;

  };

  shareAlbum(userName){
    this.myAlbumService.shareAlbum(this.selectedAlbum, userName).subscribe(
      data =>{
        console.log("Album successfully shared");
      },
      err=>{
        console.log(err.message);
      }
    )
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
        console.log(data)
        if(data = "noUser"){
          console.log("L'utilisateur n'existe pas ")
        }
        console.log("Image has been succesfully added in the database")
      },
      err =>{
        console.log(err)
      }
    )

    //Ajout de la photo dans la liste d'images existantes
    this.imageList.push(newImageObject);
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






}
