import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { PhotosComponent } from './_components/photos/photos.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        PhotosComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        ChatModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }