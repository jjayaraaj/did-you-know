import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit, OnDestroy {
  $userId: Subscription;
  userId;
  loading = true;
  user;

  constructor(
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
