import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  _pea  = [
    {
      name: 'Bananas are curved because they grow towards the sun.',
      image: 'bannana.png',
      description: 'Bananas go through a process called “negative geotropism.” Instead of growing towards the ground, they start growing towards the sun.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Polar bears could eat as many as 86 penguins in a single meal.',
      image: 'polar.png',
      description: 'If they didn’t live at opposite ends of the earth! Polar bears live in the arctic, whereas  penguins usually live in Antarctica.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Bananas are curved because they grow towards the sun.',
      image: 'bannana.png',
      description: 'Bananas go through a process called “negative geotropism.” Instead of growing towards the ground, they start growing towards the sun.',
      power: 0,
      source: 'thefacttsite.com'
    },
    {
      name: 'Polar bears could eat as many as 86 penguins in a single meal.',
      image: 'polar.png',
      description: 'If they didn’t live at opposite ends of the earth! Polar bears live in the arctic, whereas  penguins usually live in Antarctica.',
      power: 0,
      source: 'thefacttsite.com'
    },
  ];

  peo = new Subject<any>();

  private apiUrl = environment.apiUrl;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

   }

   get api() {
     return this.apiUrl;
   } 
   

   test() {
     this.peo.next(this._pea);
   }

   getTest() {
    console.log(this._pea);
     return this.peo.asObservable();
   }

   async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }


   async hideLoader() {

   await this.loadingCtrl.dismiss();

  }

  async presentAlert(alertDetails) {
    const alert = await this.alertCtrl.create(alertDetails);

    return await alert.present();
  }
   

}
