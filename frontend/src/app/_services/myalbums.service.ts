import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MyalbumsService {

  constructor(private http: HttpClient) { }


  //Récupère les albums créés par l'utilisateur connecté
  getAlbums(idUtilisateur): Observable<any> {
    return this.http.post(API_URL + "myalbums/getAlbums",{
      id: idUtilisateur
    }, httpOptions)
  };

  //Créer un album
  createAlbum(idUtilisateur, newAlbumInfo): Observable<any>{
    console.log("DESCRIPTION: "+newAlbumInfo.description);
    return this.http.post(API_URL + "myalbums/createAlbum", {
      idUtilisateur: idUtilisateur,
      nom: newAlbumInfo.nom,
      description: newAlbumInfo.description,
      lieu: newAlbumInfo.lieu
    }, httpOptions)
  };

  //Récupérer les informations d'un album
  getAlbumInfo(idAlbum): Observable<any>{
    return this.http.post(API_URL + "getInfoAlbum", {
      id: idAlbum
    }, httpOptions)
  };

  //Enregistrer les modifications d'un album
  saveModified(id, nom, desc, lieu): Observable<any>{
    return this.http.post(API_URL + "saveModified", {
      id: id,
      nom: nom,
      description: desc,
      lieu: lieu
    }, httpOptions)
  };

  //Supprimer un album
  deleteAlbum(idAlbum): Observable<any>{
    return this.http.post(API_URL + "deleteAlbum", {
      id: idAlbum
    }, httpOptions)
  };

  //Insérer un image dans la base de données
  addImage(idAlbum, linkPhoto, descPhoto): Observable<any>{
    return this.http.post(API_URL + "myalbums/addImage", {
      idAlbum: idAlbum,
      lien: linkPhoto,
      description: descPhoto
    }, httpOptions)
  };

  //Récupérer les images d'un album
  getImages(idAlbum): Observable<any>{
    return this.http.post(API_URL + "myalbums/getImages",{
      idAlbum: idAlbum
    }, httpOptions)
  }













}


