import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Other modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyalbumsComponent } from './myalbums/myalbums.component';
import { HomeComponent } from './home/home.component';
import { MyphotosComponent } from './myphotos/myphotos.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'myalbums', component: MyalbumsComponent },
  { path: 'myphotos', component: MyphotosComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MyalbumsComponent,
    HomeComponent,
    MyphotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgImageFullscreenViewModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
