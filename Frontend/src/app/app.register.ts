import { Component } from '@angular/core';

import { DataService } from './app.data.service';
import { UserData } from './userdata';

import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.register.html',
  styleUrls: ['./app.register.css']
})
export class AppRegister{

    private name:String;
    private email:String;
    private phone: Number;

    public usr = new user();

    constructor(private _data: DataService, private router: Router) {

    };

    register(): void {

        this.usr.name = this.name;
        this.usr.email = this.email;
        this.usr.phone = this.phone;

        this.usr.ads = null;
        this.usr.created_at = '04/20/2017';
        this.usr.updated_at = '04/20/2017';

        this._data.setUserParams(this.usr);

        this._data.createUser(this.usr)
        .subscribe(
            _userdata => console.log('user added'),
            error => console.log(error),
            () => {
                this.router.navigate(['/user']);
            }
        );
    }
}

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