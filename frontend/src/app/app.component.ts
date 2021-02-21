import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn= false;
  showFooter= false;
  pseudo: string;
  id: string;
  isSuperAdmin = false;
  userRole:string;
  errorMessage: string;
  lastComponent:string;



  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.pseudo = user.pseudo;
      this.id = user.id;
    }
  }

   //Permet de déconnecter l'utilisateur (vider le token) et recharger la page
   logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }



}


