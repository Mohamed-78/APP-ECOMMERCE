import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController, AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { ApiMobileService } from '../providers/api-mobile.service';

@Component({
  selector: 'app-all-routeur',
  templateUrl: './all-routeur.page.html',
  styleUrls: ['./all-routeur.page.scss'],
})
export class AllRouteurPage implements OnInit {

  urlPicture = "http://localhost:8000/admin/media/";
  routeurs: any;

  constructor(    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private storage: Storage,
    public apiMobile: ApiMobileService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) 
    { 
      
      this.Loading() 

      this.apiMobile.getAllRouteur().then(data => {
        console.log(data)
        this.routeurs = data['data'];
      });
  
    }

  ngOnInit() {
  }

  async Loading() {
    const loading = await this.loadingCtrl.create({
      message: 'Patientez svp !',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
