import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  pseudo: string;
  role:string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.pseudo = this.tokenStorage.getUser().pseudo;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        console.log("Data "+ data.body)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        const userId = this.tokenStorage.getUser().id;
        console.log("USER ID IS: "+userId)
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  };

  reloadPage() {
    window.location.reload();
    console.log(event.constructor.name);
  }

}
