import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ApiMobileService } from '../providers/api-mobile.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController, AlertController, ActionSheetController, ModalController } from "@ionic/angular";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  annonces: any;
  promotion:any;
  location: any;
  urlPicture = "http://localhost:8000/admin/media/";
  camera: any;

  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    public apiMobile: ApiMobileService,
    private loadCtrl: LoadingController,
    public navctrl: NavController,
  ) {
    
    this.apiMobile.getAnnonces().then(data => {
      console.log(data)
      this.annonces = data['data'];
    });

    this.apiMobile.getPromo().then(data => {
      console.log(data)
      this.promotion = data['data'];
    });
    //this.Loading()
    this.apiMobile.getCamera().then(data => {
      console.log(data)
      this.camera = data['data'];
    });

  }


  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }

  async Loading() {
    const loading = await this.loadCtrl.create({
      message: 'Patientez svp !',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }



}
