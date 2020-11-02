import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit, OnDestroy {
  userId;
  user;
  $userId: Subscription;
  loading = true;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
    
  ) { }

  ngOnInit() {
    this.setUser();

  }

  ionViewWillEnter() {
    this.setUser();
  }

  setUser() {
    
    this.$userId = this._authService.userId.subscribe((userId) => {
      this.userId = userId;

      if(this.userId) {
        this._authService.getUserDetails(this.userId).subscribe( (data:any) => {     
          this.user = data.response;
          this.loading = false;
        });
      }

    }, error=> {});
  }



  ngOnDestroy() {
    this.$userId.unsubscribe();
  }


}
