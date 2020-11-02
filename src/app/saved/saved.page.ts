import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dyk } from '../model/dyk.model';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { DykService } from '../services/dyk.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit, OnDestroy {

  dyks: Dyk[];
  imageUrl = environment.imageUrl;
  $userId:Subscription;
  userId: number;
  $savedDyks: Subscription;
  noFavrite = false;

  constructor(
    private authService: AuthService,
    private _dykService: DykService,
    public loadingCtrl: LoadingController,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    this.$userId = this.authService.userId.subscribe( id => {
      this.userId = +id;
      this.fetchSaved();    


    });

    this.$savedDyks = this._dykService.dyksSaved.subscribe((data:any)=> {
      // this.dyks.push(data);
       if(data != null) this.noFavrite = false;
     }, error => {})
    
  }

  ngOnDestroy() {
    this.$userId.unsubscribe();
    this.$savedDyks.unsubscribe();
  }

  ionViewWillEnter() {
    // this.fetchSaved();    
    // this.$savedDyks = this._dykService.dyksSaved.subscribe((data:any)=> {
    //  // this.dyks.push(data);
    //   if(data != null) this.noFavrite = false;
    // }, error => {})
  }

  fetchSaved() {
    this.commonService.presentLoading();
    this._dykService.savedDykPost(this.userId).subscribe( (response: any) => {    
      this.commonService.hideLoader();
      this.dyks = response.dyks;
      if(this.dyks.length === 0) {
        
        this.noFavrite = true;
        
      }
    });
  }

  unsaveDyk(dyk) {   
    this.commonService.presentLoading();
    const dykDetail ={
      userId : dyk.user_id,
      dykId: dyk.dyk_id  
    }; 
    this.noFavrite = false;

    // const ItemIndex = this.dyks.findIndex(p => p.id === dyk.id);
    // this.dyks.splice(ItemIndex, 1);

    this._dykService.unsaveDykPost(dykDetail).subscribe((response) => {
      this.commonService.hideLoader();
      if(response){
        const res = response.response;

        const deleteItemIndex = this.dyks.findIndex(p => p.id === res.dykId);
        
        this.dyks.splice(deleteItemIndex, 1);
        
        if(this.dyks.length === 0) {        
          this.noFavrite = true;          
        }
    
      }
      else {
        console.log("No Data Available");
      }

  }, error=> {

  });

  }

}
