import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // https://blog.angular-university.io/angular-http/
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import * as Components from '../components/index';
import * as Services from '../services/index';

@NgModule({
    declarations: [
        AppComponent,
        Components.ItemListComponent,
        Components.AnimationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [
        Services.HttpClient,
        Services.NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
