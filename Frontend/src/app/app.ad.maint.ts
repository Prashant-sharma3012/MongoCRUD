import { Component, OnInit } from '@angular/core';

import { DataService } from './app.data.service';
import { UserData } from './userdata';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.ad.maint.html',
  styleUrls: ['./app.ad.maint.css']
})

export class AppAdmaint implements OnInit{

    private product: String;
    private desc: String;
    private cost: Number;
    private location: String;
    private contact: Number;
    private idx:number;
    addet:Object;
    public ad = new ad();
    private id:number;
    private add:boolean = true;

    public usr = new user();

    constructor(private _data: DataService, private router: Router,private _route: ActivatedRoute) {

    };

    ngOnInit(){
        this._route.params.subscribe(
            params => {
                this.id = params['id'];
                if (this.id){
                this.add = false;
                this.idx = this.id - 1;
                this.usr = this._data.sendUser();
                this.addet = JSON.parse(JSON.stringify(this.usr.ads[this.idx]));
                this.product = this.addet['product'];
                this.cost = this.addet['cost'];
                this.desc = this.addet['desc'];
                this.location = this.addet['location'];
                this.contact = this.addet['contact'];
                }else{
                    this.add = true;
                }
            }
        );
    }

submitAd(){

    let usrData = this._data.getUserParams();

    this.usr.name = usrData[0].toString();
    this.usr.email= usrData[1].toString();
    this.usr.phone = Number(usrData[2]);
    this.ad.product = this.product;
    this.ad.Contact = this.contact;
    this.ad.cost = this.cost;
    this.ad.desc = this.desc;
    this.ad.location = this.location;

    if(this.add){
        this.ad.id = 1;
        this.usr.ads = [this.ad];

        this.usr.updated_at = '04/24/20147';
        this.usr.created_at = '04/24/2017';
        this._data.createUser(this.usr)
        .subscribe(
            _userdata => console.log(_userdata),
            error => console.log(error),
            () => {
                this.router.navigate(['/user']);
            });
        }else
        {
        this.ad.id = this.id;
        this.usr.ads = [this.ad];
        this._data.maintAd(this.usr)
        .subscribe(
            _userdata => console.log(_userdata),
            error => console.log(error),
            () => {
                this.router.navigate(['/user']);
            });
        }
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
    
class user {
            name: String;
            phone: Number;
            email: String;
            ads: [{
                id: Number;
                product: String;
                desc: String;
                cost: Number;
                location: String;
                Contact: Number;
            }];
            created_at: String;
            updated_at: String;
    };