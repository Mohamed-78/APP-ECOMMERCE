import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMobileService {
  apiUrl = "http://localhost:8000/api/v1/";
  type = "http://localhost:8000/api/v1/annonces";

  constructor(public httpclient: HttpClient) { }

  //Récupérer les annonces de routeurs
  getAnnonces() {
    return new Promise(resolve => {
      this.httpclient.get(this.apiUrl + "annonces").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  //Récupérer tous les routeurs
  getAllRouteur() {
    return new Promise(resolve => {
      this.httpclient.get(this.apiUrl + "allRouteur").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  //Récupérer les annonces de routeurs
  getPromo() {
    return new Promise(resolve => {
      this.httpclient.get(this.apiUrl + "promo").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  //Récupérer les annonces de cameras
  getCamera() {
    return new Promise(resolve => {
      this.httpclient.get(this.apiUrl + "produits").subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  
  // connecter un utilisateur
  setlogin(email, password) {
    return new Promise(resolve => {
      this.httpclient
        .get(this.apiUrl + "auth/connexion/" + email + "/" + password)
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  createUser(name,email,password){
    return new Promise(resolve => {
      this.httpclient.get(this.apiUrl + "auth/register/"+name+'/'+email+'/'+password).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  // Récupérer les détails d'une annonce:
  getAnnonceDetail(id) {
  return new Promise(resolve => {
    this.httpclient.get(this.apiUrl + "details/" + id + "/annonce").subscribe(
      data => {
        resolve(data);
      },
      err => {
        console.log(err);
      }
    );
  });
}
}
