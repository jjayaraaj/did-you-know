import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { User } from '../model/user.model';
import { map, tap } from 'rxjs/operators';
import { AuthResponse } from '../model/auth-response.model';
import { Plugins } from '@capacitor/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private _user = new BehaviorSubject<User>(null); 
  
  private _storedUser = new Subject();

  get userIsAuthendicated() {
    return this._user.asObservable().pipe(map( user => {
     // console.log(user);
      if(user) {
       
        return !!user.token
      }else {
        return false;
      }
    }      
    ));
  }

  get  userId() {
    return this._user.asObservable().pipe(map( user => {
      if(user) {
        return user.id;
      }else {
        return null;
      }
    }));
  }

  get storedUser() {
    return this._storedUser.asObservable();
  }

  

  constructor(
    private http: HttpClient,
    private _commonService: CommonService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private storage: StorageService 
  ) { }


  newUser(user) {    
  this._commonService.presentLoading();

    this.http.post(this._commonService.api+ "signup", user).subscribe( response => {
      this._commonService.hideLoader();
      this.router.navigate(['/', 'login']);

    }, errorResponse => {
      this._commonService.hideLoader();
      this.showAlert('Error','', JSON.stringify(errorResponse.error.error));
    }, () => {
      //this.commonService.dismiss();
    });
  
  }

  getUser() {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    this.http.get('http://localhost:3000/api/user/').subscribe((response) => {
     // console.log(response);
  });
  }
  

 
  

  login(credentials) {

   this._commonService.presentLoading();
  
    this.http.post<{token: string, id: any,  username: string }>(this._commonService.api+'signin', credentials).subscribe(response => {
      if(response.id) {
        //console.log(response.id);
        this._commonService.hideLoader();
      this.router.navigateByUrl('/dyk');
      
      this.setUserData(response);
       

      }else{
       // console.log("asdasd");
      }
    }, (errorResponse)=> {
      console.log(errorResponse);
      this._commonService.hideLoader();
      this.showAlert('Atuthendication Error',errorResponse.statusText, errorResponse.error.error);
    });
  }

  showAlert( header?, subtitle?, message?) {
    this._commonService.presentAlert({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });
  }

  logout() {
   this._user.next(null);
   Plugins.Storage.clear();
    this.router.navigateByUrl('/login');
  }

  private setUserData(userData: AuthResponse) {
    this._user.next(
      new User(
        userData.id,    
        userData.token,
        userData.username
      )
    );

    this.StoreAuthData(userData.id, userData.token);
  }

  private StoreAuthData(
    userId: string, token: string
  ) {
   
    // this.storage.setObject('authData', {
    //   userId: userId,
    //   token: token
    // });

    Plugins.Storage.set({
      key:'authData',
      value:  JSON.stringify({
        userId: userId,
        token: token
      })
    });

  }

  autoLogins() {
    let userDetails = {username: 'Jayaraj'};
    this.storage.getObject('authData').then((data: any) => {
     
      if(!data.userId || !data.token) {
      //  console.log(data.token);
        return false;
      }else {
       // console.log(userDetails);
        this._storedUser.next(data);
        this._user.next(
          new User(
            data.userId,    
            data.token,
            data.username
          )
        );
      }
      
    });

  }


  autoLogin() {
    let userDetails = {username: 'Jayaraj'};
    
    return from(Plugins.Storage.get({key: 'authData'})).pipe(
      map(storedData=>{
      if(!storedData || !storedData.value) {
        return null;
      }
      const parseData = JSON.parse(storedData.value) as {token: string, userId: string, username: string }
      const user  = new User(parseData.userId, parseData.token, parseData.username);

      return user;
    }),
    tap(user => {
      this._user.next(user);
    }),
    map(user => {
      return !!user;
    })
    
    );

  }

  getUserDetails(userId) {
        return this.http.get(this._commonService.api+'user/'+ userId);

  }

  forgotPassword(emailId) {
    return this.http.post(this._commonService.api+'forgotpassword', emailId);

  }

  checkOtp(otpValue) {
    return this.http.post(this._commonService.api+'optconfirmation', otpValue);
  }

  changeNewPassword(newPasswordDetails) {
    
    return this.http.post<{response: string, code: number}>(this._commonService.api+'newpassword', newPasswordDetails);
  }

}
