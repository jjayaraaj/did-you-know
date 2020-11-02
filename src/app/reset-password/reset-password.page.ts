import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { OtpPage } from './otp.page';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

 resetPasswordPanel = false;
 otpValue;
 email;

  constructor(
    private _modalCtrl: ModalController,
    private _authService: AuthService,
    private _toast: ToastController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    this.presentLoading();
    this._authService.forgotPassword(form.value).subscribe( otp => {
      this.hideLoader();
      this.openModal(form.value);
    }, error=> {
      console.log(error);
    })
  }

  async openModal(otp) {
    
    const modal =  await this._modalCtrl.create({
      component: OtpPage,
      componentProps: otp

    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data.active === 1) {
      this.otpValue = data.message;
      this.email = data.email;
      this.resetPasswordPanel = true;
    }
  }

  onSubmitNewPassword(form: NgForm) {
    this.presentLoading();
    if(form.valid)
    {
      const newPasswordValue = form.value;
      newPasswordValue.email = this.email;      
      this._authService.changeNewPassword(newPasswordValue).subscribe((response) => {
        this.hideLoader();
        this.presentToast(response.response);

        this.navCtrl.pop();
        
      }, error => {
        console.log(error);
      })

    }
  }

  async presentToast(message) {
    const toast = await this._toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
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


}
