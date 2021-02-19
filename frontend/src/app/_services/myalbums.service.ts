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

  createAlbum(idUtilisateur, newAlbumInfo): Observable<any>{
    console.log("DESCRIPTION: "+newAlbumInfo.description);
    return this.http.post(API_URL + "myalbums/createAlbum", {
      idUtilisateur: idUtilisateur,
      nom: newAlbumInfo.nom,
      description: newAlbumInfo.description,
      lieu: newAlbumInfo.lieu
    }, httpOptions)
  };

  getAlbumInfo(idAlbum): Observable<any>{
    return this.http.post(API_URL + "getInfoAlbum", {
      id: idAlbum
    }, httpOptions)
  };

  saveModified(id, nom, desc, lieu): Observable<any>{
    return this.http.post(API_URL + "saveModified", {
      id: id,
      nom: nom,
      description: desc,
      lieu: lieu
    }, httpOptions)
  };

  deleteAlbum(idAlbum): Observable<any>{
    return this.http.post(API_URL + "deleteAlbum", {
      id: idAlbum
    }, httpOptions)
  };













}



