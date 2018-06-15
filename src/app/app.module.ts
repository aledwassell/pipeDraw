import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './_components/chat/chat.component';
import { MineComponent } from "./_components/mine/mine.component";
import { ValidateDirective } from './_directives/validate.directive';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        MineComponent,
        ValidateDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }