import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './_components/chat/chat.component';
import { CanvasComponent } from './_components/canvas/canvas.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
import { ToolbarComponent } from './_components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        CanvasComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule, MatToolbarModule, MatFormFieldModule, MatInputModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }