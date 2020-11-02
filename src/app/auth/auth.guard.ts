import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, OnDestroy {

  $userToken: Subscription;

  constructor(
    private authService:AuthService,
    private router: Router
  ) {

  }

  // canLoad(route: Route, 
  //   segments: UrlSegment[]
  //   ): Observable<boolean> | Promise<boolean> | boolean{
  //     let auth = false;
  //     this.$userToken = this.authService.userIsAuthendicated.pipe(tap(isAUhtendicated => {
  //       if(!isAUhtendicated) {
  //         console.log("autp", isAUhtendicated);
  //        return this.authService.autoLogin();
  //       }
  //     })).subscribe((data)=>{
              
  //       if(!data) {        
  //         this.router.navigateByUrl('/login');
  //       }
  //       auth = true;
  //     });     

  //     return auth;
    
      
  // }

  canLoad(route: Route, 
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean{
      let auth = false;
      
      return this.authService.userIsAuthendicated.pipe(
        take(1),
        switchMap(isAuthendicated => {
          if(!isAuthendicated){
            return this.authService.autoLogin();
          }else{
            return of(isAuthendicated);
          }
           
        }),
        tap(isAuthendicated => {
          if(!isAuthendicated){
            this.router.navigateByUrl('/login');
          }          
        })
      );
    
      
  }

  ngOnDestroy() {
    //this.$userToken.unsubscribe();
  }
}
