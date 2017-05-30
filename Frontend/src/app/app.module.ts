import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppRegister } from './app.register';
import { AppUsrdetail } from './app.usr.detail';
import { AppAdmaint } from './app.ad.maint';
import { AppAddetail } from './app.ad.detail';

import { DataService } from './app.data.service';

import { UserData } from './userdata';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AppRegister,
    AppUsrdetail,
    AppAdmaint,
    AppAddetail
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
        RouterModule.forRoot([
        {path: '', component: AppRegister},
        {path: 'user', component: AppUsrdetail},
        {path: 'maint', component: AppAdmaint},
        {path: 'maint/:id', component: AppAdmaint},
        {path: 'detail/:id', component: AppAddetail},
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
