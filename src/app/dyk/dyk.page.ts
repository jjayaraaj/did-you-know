import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { DykService } from '../services/dyk.service';
import { Dyk } from '../model/dyk.model';
import { environment } from 'src/environments/environment';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { StorageService } from '../services/storage.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NetworkStatus, PluginListenerHandle, Plugins } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
//import { Network } from '@ionic-native/network/ngx';

const { Network } = Plugins;


@Component({
  selector: 'app-dyk',
  templateUrl: './dyk.page.html',
  styleUrls: ['./dyk.page.scss'],
})
export class DykPage implements OnInit, OnDestroy {

  dyks: Dyk[];
  $dyks: Subscription;
  offset = 0;
  limit = 50;
  page = 1;
  imageUrl = environment.imageUrl; 
  saved = false;
  savedItem;
  dyKDetails:any;
  networkListner: PluginListenerHandle;
  networkStatus: NetworkStatus;4
  tagId;
  loading = true;

  disconnectSubscription : Subscription;

  $userAuthendicated: Subscription;
 $userId:Subscription;

 userId: number;


  constructor(
    private authService: AuthService,
    private _dykService: DykService,
    private _admobFree: AdMobFree,
    private storage: StorageService,
    private _toast: ToastController,
    private loadingCtrl: LoadingController,
    private _socialSharing: SocialSharing,
    private route: ActivatedRoute
    // private _network: Network
  ) { }

  ngOnInit() {

    this.tagId = this.route.snapshot.paramMap.get('id');    

    this.networkListner = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.networkStatus = status;
    });

    // this.disconnectSubscription = this._network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    // });
    
    this.$userAuthendicated = this.authService.userIsAuthendicated.subscribe((data)=>{
      // console.log(data);
    });

    this.$userId = this.authService.userId.subscribe( id => this.userId = +id);
    this.loadData(null);


    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true
     };

     const interstitalConfig: AdMobFreeInterstitialConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true
     };

     this._admobFree.interstitial.config(interstitalConfig);

     this._admobFree.interstitial.prepare()
     .then(()=> {
       
     })
     .catch(e => console.log());


     this._admobFree.banner.config(bannerConfig);
     
     this._admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

  showAdd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true
     };
     this._admobFree.banner.config(bannerConfig);
     
     this._admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

  

  ionViewWillEnter() {
    // this.$dyks = this._dykService.dyks.subscribe((data) => {
    //   console.log(data);
    //   this.dyks = data;
    // })
    
    // this.loadData(null);
     
    
  }

  ngOnDestroy() {
    this.$userAuthendicated.unsubscribe();
    this.$userId.unsubscribe();
    // this.disconnectSubscription.unsubscribe();
  }

  
  loadData(event) {
    // this.presentLoading();
   
    if(event == null){
      this.page = 1;  

     
     
  
      this.dyks = [];
    }      
    else{
      this.page++;
     
    }

    this.offset = (this.page - 1)* this.limit;

    if(this.tagId !== null) {
      console.log('tag is available');
      this._dykService.fetchDykPostByTag(this.limit, this.offset, this.userId, this.tagId).subscribe(resData => {
        this.dyks = this.dyks.concat(resData.dyks);
        this.loading = false;
      
        if(event != null) {
          
          event.target.complete();
          if(resData.dyks.length < 50) {
            
            event.target.disabled = true;
          }
        }else {
         
        }
      })
    }
    else{
      this._dykService.fetchDykPost(this.limit, this.offset, this.userId).subscribe((resData: any)=>{
        this.dyks = this.dyks.concat(resData.dyks);
       
        this.loading = false;
        if(event != null) {
          
          event.target.complete();
          if(resData.dyks.length < 50) {
            
            event.target.disabled = true;
          }
        }else {
         
        }
  
       // this.hideLoader();
  
      }, err=> {}, () => {
      
      } );
    }

    
  }

  doRefresh(event) {

    this.offset = 0;
    
    // console.log(this.limit, this.offset);

    this._dykService.fetchDykPost(this.limit, this.offset, this.userId).subscribe((resData: any)=>{ 
      this.dyks  = resData.dyks;
     
    }, error=> {})
    //console.log(this.dyks );

    if(event != null) {
      event.target.complete();
    }
  
  }

  onClickSave(dyk) {
    
    // console.log(dyk);
    this.dyKDetails = {...dyk};



    this.dyKDetails.userId = this.userId;
    this.dyKDetails.savedID = dyk.id;
    this.dyKDetails.savedUserId = this.userId;
      const updatedDyk = [...this.dyks];
    const oldDykIndex = this.dyks.findIndex(p => p.id === dyk.id);
    updatedDyk[oldDykIndex] = this.dyKDetails;
    this.dyks = updatedDyk;


    // console.log('dykindex', this.dyks);

    this._dykService.saveDykPost(this.dyKDetails);
    const message = `Added to favorite!`
    this.presentToast(message);
  }

  onClickUnsave(dyk) {


this.dyKDetails = {...dyk};
    const dykDetail ={
      userId : dyk.savedUserId,
      dykId: dyk.id  
    }; 

      this.dyKDetails = {...dyk};
    this._dykService.unsaveDykPost(dykDetail).subscribe((response) => {
      
      if(response){
        const res = response.response;

        this.dyKDetails.savedID = null;
        this.dyKDetails.savedUserId = null;

        const updatedDyk = [...this.dyks];
        const oldDykIndex = this.dyks.findIndex(p => p.id === res.dykId);
        updatedDyk[oldDykIndex] = this.dyKDetails;
        this.dyks = updatedDyk;

       // const deleteItemIndex = this.dyks.findIndex(p => p.id === res.dykId);

        //this.dyks.splice(deleteItemIndex, 1);
        
       
      }
      else {
        console.log("No Data Available");
      }

  }, error=> {

  });

    const message = `Removed from favorite`
    this.presentToast(message);



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
    console.log('Loading dismissed with role:');
  }

  async hideLoader() {

   await this.loadingCtrl.dismiss();

  }


  shareWhatspp(dyk) {
    const imgUrl = this.imageUrl + dyk.image;
    const desc = `${dyk.description}`;
    console.log(imgUrl);
    this._socialSharing.shareViaWhatsApp(desc, imgUrl, "http://goidux.com");
  }

}
