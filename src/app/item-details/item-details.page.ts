import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController, AlertController, ActionSheetController, ModalController } from "@ionic/angular";
import { registerLocaleData } from '@angular/common';
import { ApiMobileService } from '../providers/api-mobile.service';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;

  annonce_id: any;
  annonce: any;
  urlPicture = "http://localhost:8000/admin/media/";

  constructor(
    private animatioCntrl: AnimationController,
    private activatedRoute: ActivatedRoute,
    public apiMobile: ApiMobileService,
    private loadCtrl: LoadingController,
  ) {

    //Contient les informations sur un itinéraire
    this.annonce_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.annonce_id);

    this.apiMobile.getAnnonceDetail(this.annonce_id).then(data => {
      console.log(data)
      this.annonce = data;
      this.annonce[0].photos=JSON.parse(data[0].photos);
      //console.log(this.annonce);
    });
  }

  async Loading() {
    const loading = await this.loadCtrl.create({
      message: 'Patientez svp !',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {
    this.activeVariation = 'size';
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
        .fromTo('opacity', '1', '0.2')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
    } else {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

}
