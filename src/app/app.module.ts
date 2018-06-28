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
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule
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
        ColorPickerModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }