import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'otp-page',
    templateUrl: './otp.page.html',
    styleUrls: ['./otp.page.scss'],
  })

export class OtpPage {

    constructor(
        private _modalCtrl: ModalController,
        private _authService: AuthService
    ) {

    }

    @Input() email;

    onSubmit(form: NgForm){

        const otpDetails = form.value;
        otpDetails.email = this.email;
       this._authService.checkOtp(otpDetails).subscribe((response: any) => {
        
        this._modalCtrl.dismiss({
            message: form.value,
            active: 1,
            email: response.email
        },
        'confirm'
        );

       }, error => {
           console.log(error);
       })

     

      
        
    }

    onModalClose() {
        this._modalCtrl.dismiss({  active: 0}, 'cancel');
    }

}