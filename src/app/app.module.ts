import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './_components/chat/chat.component';
import { ValidateDirective } from './_directives/validate.directive';
import { CanvasComponent } from './_components/canvas/canvas.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        ValidateDirective,
        CanvasComponent
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