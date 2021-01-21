import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController, AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { ApiMobileService } from '../providers/api-mobile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  retr : any;
  msg:any;
  retriveUserData:any;
  isLogged : boolean = false;

  userData: void;
      
  userDetail = {id:'',name: '', email:'',password:''}

  newUser =
  {
    name: '', email: '', password: ''
  };

  cal:any;
  loading:any;

  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private storage: Storage,
    public apiMobile: ApiMobileService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }

  register(){
 
    if (this.newUser.name!="" && 
          this.newUser.email!="" && 
          this.newUser.password!="") {
            
            this.apiMobile.createUser(this.newUser.name,this.newUser.email,this.newUser.password).then((res) =>{
              this.retriveUserData = res;
              console.log(this.retr);
              switch (this.retriveUserData.statut) {
                case "success":
                  this.isLogged = true;
                  this.userDetail.id = this.retriveUserData.user_id;
                  this.userDetail.name = this.retriveUserData.name;
                  this.userDetail.email = this.retriveUserData.email;
                  
                  this.storage.set("infoUnser",this.userDetail)
                  .then(value => this.Toast(this.retriveUserData.message))
                  .then(value => this.isLogged = true)
                  .catch(err => console.log(err));
                  
                  this.navCtrl.navigateForward('/home');
                  break;
                case "error":
                 this.Toast(this.retriveUserData.message)
                  this.isLogged = false;
                  break;
              }
              this.Toast(this.retr.message)
            })
            
    }else{
      this.msg = "Veuillez remplir les champs svp!";
      this.Toast(this.msg);
    }

  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration:3000
    }).then(toastData => toastData.present());
  }

  async Toast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: "danger",
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
