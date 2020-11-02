import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  $userId: Subscription;
  userId = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private _fcmService: FcmService,
    private _router: Router,
    private _storage: StorageService,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //trigger push setup
     this._fcmService.initPush();

  //    // get FCM token
  //    this.fcm.getToken().then(token => {
  //     console.log(token);
  //   });

  //   // ionic push notification example
  //   this.fcm.onNotification().subscribe(data => {
  //     console.log(data);
  //     if (data.wasTapped) {
  //       console.log('Received in background');
  //     } else {
  //       console.log('Received in foreground');
  //     }
  //   });      

  //   // refresh the FCM token
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     console.log(token);
  //   });

  //   // unsubscribe from a topic
  //   // this.fcm.unsubscribeFromTopic('offers');

  });

    
  }

  ngOnInit() {
    this.$userId = this.authService.userId.subscribe((userId) => {
      this.userId = userId;
    }, error=> {});
  }

  ngOnDestroy() {
    this.$userId.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }


}
