import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { ToastController, LoadingController, NavController, AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { ApiMobileService } from '../providers/api-mobile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg: any;
  retriveUserData: any;
  isLogged: boolean = false;

  user =
    {
      Uloggin: '',
      Upassword: '',
    };

  userData: void;

  userDetail = { id: '', name: '', email: '' }

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private storage: Storage,
    public apiMobile: ApiMobileService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,

  ) {
    this.storage.get('infoUnser').then((val) => {
      if (val) {
        console.log(this.isLogged = true);
        this.navCtrl.navigateForward('/home');
      } else {
        this.navCtrl.navigateForward('/login');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.user.Uloggin === "" || this.user.Upassword === "") {
      this.msg = "Renseigner vos identifiants de connexion!";
      this.Toast(this.msg);
    } else {
      this.Loading()
      this.apiMobile.setlogin(this.user.Uloggin, this.user.Upassword).then((res) => {
        this.retriveUserData = res;
        this.Loading()
        this.Toast(this.retriveUserData.message)
        console.log(this.retriveUserData);
        switch (this.retriveUserData.statut) {
          case "success":
            this.isLogged = true;
            this.userDetail.id = this.retriveUserData.user_id;
            this.userDetail.name = this.retriveUserData.name;
            this.userDetail.email = this.retriveUserData.email;

            this.storage.set("infoUnser", this.userDetail)
              .then(value => this.Toast(this.retriveUserData.message))
              .then(value => this.isLogged = true)
              .catch(err => console.log(err));

            this.navCtrl.navigateForward('/profil');
            break;
          case "error":
            this.Toast(this.retriveUserData.message)
            this.isLogged = false;
            break;
        }

      })

    }

  }

  async Loading() {
    const loading = await this.loadingCtrl.create({
      message: 'Patientez svp !',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async Toast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: "primary",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',

        }
      ]
    });
    toast.present();
  }

}
