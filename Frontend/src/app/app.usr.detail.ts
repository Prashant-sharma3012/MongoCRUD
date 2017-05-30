import { Component,OnInit } from '@angular/core';

import { DataService } from './app.data.service';
import { UserData } from './userdata';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.usr.detail.html',
  styleUrls: ['./app.usr.detail.css']
})
export class AppUsrdetail implements OnInit {

    addNew(){
        console.log("going to ad details or maint");
        this.router.navigate(['/maint'])
    }

    details(){
        console.log('going to details');
    }

    editAd()
    {
        console.log("going to ad3 details or maint");
    }

    deleteAd(id)
    {
        let usr = this._data.getUserParams();
        this.ad = [];

        this._data.deleteAd(usr[0],usr[1],usr[2],id).
        subscribe(
            _userdata => {
                this.usr = _userdata
                console.log(this.usr);
            },  
            error => console.log(error),
            () => {
                this.usr.ads.forEach((a)=>{
                    this.ad.push(a);
                });
                this._data.saveUser(this.usr);
                if (this.ad !== [])
                {
                    this.iterate = true;
                }                
            }
        );
    }

    usr : UserData;
    ad : Array<ad>;
    iterate:boolean = false;

    constructor(private _data: DataService, private router: Router) {

    };

    ngOnInit(){
        let usr = this._data.getUserParams();
        this.ad = [];

        this._data.getUserData(usr[0],usr[1],usr[2])
        .subscribe(
            _userdata => {
                this.usr = _userdata
            },
            error => console.log(error),
            () => {
                this.usr[0].ads.forEach((a)=>{
                    this.ad.push(a);
                });
                this._data.saveUser(this.usr[0]);
                if (this.ad !== [])
                {
                    this.iterate = true;
                }
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
