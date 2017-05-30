import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions ,URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { UserData } from './userdata';

@Injectable()
export class DataService {
    private _getUserData = 'http://localhost:3000/user';
    private _addUser = 'http://localhost:3000/userad';
    private _adMaint = 'http://localhost:3000/useredit';
    private _adDelete = 'http://localhost:3000/usrrmvad';

    private uName: String;
    private uEmail: String;
    private uPhone: Number;

    private usrData = new user();

    constructor(private _http: Http) { }

    setUserParams(User):void{
        this.uName = User.name;
        this.uEmail = User.email;
        this.uPhone = User.phone;
    }

    getUserParams() {
        
        return [this.uName,
                this.uEmail,
                this.uPhone
        ];
    }

    saveUser(UserData){
        this.usrData = JSON.parse(JSON.stringify(UserData));
    }

    sendUser(){
        return this.usrData;
    }

    getUserData(name,email,phone): Observable<UserData> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('email',email);
        params.set('phone',phone);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this._http.get(this._getUserData,requestOptions)
            .map((response: Response) => <UserData> response.json())
            .catch(this.handleError);
    }

    createUser(UserData): Observable<UserData> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._addUser, JSON.stringify(UserData) , options)
                    .map((response: Response) => <UserData> response.json())
                    .catch(this.handleError);
  }

    maintAd(usr): Observable<UserData> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 

        let params: URLSearchParams = new URLSearchParams();
        params.set('name', usr.name);
        params.set('email',usr.email);
        params.set('phone',usr.phone);
        params.set('id',usr.ads[0].id);

        options.search = params;
        return this._http.put(this._adMaint, JSON.stringify(usr) , options)
                    .map((response: Response) => <UserData> response.json())
                    .catch(this.handleError);
  }

      deleteAd(name,email,phone,id): Observable<UserData> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('email',email);
        params.set('phone',phone);
        params.set('id',id);

        options.search = params;

        return this._http.delete(this._adDelete, options)
                    .map((response: Response) => <UserData> response.json())
                    .catch(this.handleError);
  }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
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