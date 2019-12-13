import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './canvas/canvas.component';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
