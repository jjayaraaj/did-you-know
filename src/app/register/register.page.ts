import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  agreed = false;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.initRegisterForm();  
    
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      name: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dob: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      country: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    
    });
  }

  onSubmit() {
    
    if(!this.registerForm.valid){
      alert("not valid")
    }else{
      this.authService.newUser(this.registerForm.value); 
      //console.log(this.registerForm.value);
    }    
  }

  agreedChange() {
    this.agreed = !this.agreed;
  }

}
