import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './_components/toolbar/toolbar.component';
import { ChatComponent } from './_components/chat/chat.component';
import { CanvasComponent } from './_components/canvas/canvas.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';
import {AngularFireModule} from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment} from "../environments/environment";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule, MatDividerModule, MatSliderModule
} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ChatComponent,
        CanvasComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        LayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatDividerModule,
        MatSliderModule,
        ColorPickerModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }