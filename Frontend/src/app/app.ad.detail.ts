import { Component,OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from './app.data.service';

import { UserData } from './userdata';


@Component({
  selector: 'app-root',
  templateUrl: './app.ad.detail.html',
  styleUrls: ['./app.ad.detail.css']
})
export class AppAddetail implements OnInit{
  
  private id: number;
  public usr: UserData;
  public idx: number;
  addet: Array<ad>;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _data: DataService) {
    }
    
    ngOnInit(){
        this._route.params.subscribe(
            params => {
                this.id = params['id'];
                this.idx = this.id - 1;
                this.usr = this._data.sendUser();
                this.addet = JSON.parse(JSON.stringify(this.usr.ads[this.idx]));
            }
        );
    }
}

class ad {
                id: Number;
                product: String;
                desc: String;
                cost: Number;
                location: String;
                Contact: Number;
    };
