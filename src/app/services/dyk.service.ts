import { Injectable } from "@angular/core";
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Dyk } from '../model/dyk.model';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Tag } from '../model/tag.model';

@Injectable({
    providedIn: 'root'
})

export class DykService { 

    private _dyks: Dyk[] = [];
    private _dyksSub = new Subject<Dyk[]>();

    private _dykSaved = new Subject();

    constructor( 
        private _commonService: CommonService, private _http: HttpClient,
        
        ) 
    { }

    get dyks() {
        return this._dyksSub.asObservable();
    }

    get dyksSaved() {
        return this._dykSaved.asObservable();
    }

    fetchDyk(limit:number, offset:number) {
        return this._http.get<{dyks: Dyk}>(this._commonService.api + `dyk?limit=${limit}&offset=${offset}`)
        .subscribe((resData: any)=> {
            this._dyksSub.next(resData.dyks);
        }, (error) => {
      
        });
        
    }

    fetchDykPost(limit:number, offset:number, userId) {
        
        return this._http.get<{dyks: Dyk}>(this._commonService.api + `dyk?limit=${limit}&offset=${offset}&userId=${userId}`);
    }

    fetchDykPostByTag(limit:number, offset:number, userId, tagId) {
        
        return this._http.get<{dyks: any}>(this._commonService.api + `dykbytag?limit=${limit}&offset=${offset}&userId=${userId}&tagId=${tagId}`);
    }


    saveDykPost(dyk) { 
        const dykId =   +dyk.id;   
        const dykDetials = {
            dyk_id: dykId,
            user_id: dyk.userId
        }
        this._http.post<{response: any}>(this._commonService.api + 'dyk/save', dykDetials).subscribe( response => {
            const data = response.response;
            
            this._dykSaved.next(data);
      
          //this._dykSaved = data.dyk_id;
           
            // if(response.response == 'saved') {
            //   this.saved = true;
            // }
        })
    }

    savedDykPost(userId) {     
        return this._http.get<{dyks: any}>(this._commonService.api + `dyk/save?userId=${userId}`);
    }

    unsaveDykPost(dykDetail) {
        
        return this._http.post<{response: any}>(this._commonService.api + `dyk/unsave`, dykDetail);
    }

    getAllTags() {
        return this._http.get<{tag: Tag[]}>(this._commonService.api + `dyk/getalltags`);
    }
}