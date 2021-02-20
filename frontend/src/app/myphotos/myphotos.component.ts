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

}
