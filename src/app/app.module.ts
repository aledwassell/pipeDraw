import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";

import { AppComponent } from './app.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }