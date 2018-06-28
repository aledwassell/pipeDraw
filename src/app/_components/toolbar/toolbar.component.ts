import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import {Observable } from "rxjs/index";
import { WebsocketService } from "../../_services/websocket.service";

@Component({
  selector: 'app-toolbar',
  template: `      
      <mat-accordion>
          <mat-expansion-panel>
              <mat-expansion-panel-header>
                  <mat-panel-title>
                      Colour
                  </mat-panel-title>
                  <mat-panel-description>
                      Choose pen color
                  </mat-panel-description>
              </mat-expansion-panel-header>
              <form [formGroup]="swatches">
                  <section *ngFor="let color of arrayColors">
                      <input formControlName="a"
                             class="swatch"
                             [cpPosition]="'bottom'"
                             [(colorPicker)]="color.color"
                             (colorPickerChange)="onColorChange($event)"
                             [style.background]="color.color"/>
                      <mat-divider *ngIf="arrayColors.length > 1"></mat-divider>
                  </section>
                  
              </form>
              <button (click)="addColor()">plus</button>
              <button (click)="colorGen()">rand</button>
          </mat-expansion-panel>
      </mat-accordion>
      <app-chat></app-chat>
  `,
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private webSocket: WebsocketService) { }

    public arrayColors: any = [
        {color: '#2883e9'}
    ];

    swatches = new FormGroup({
        a: new FormControl(),
        b: new FormControl(),
        c: new FormControl(),
        d: new FormControl()
    });
    addColor(): void {
        this.arrayColors.push({color: '#222222'})
    }
    onColorChange(e): void {
        this.webSocket.colorChange(e);
    }

    colorGen() {
        let hex = '0123456789abcdef';
        let r = hex[Math.floor(Math.random() * (16 - 0) + 0)];
        console.log(`#${r}${r}${r}${r}${r}${r}`);
        // return `#${}${}${}${}${}${}`;
    }

  ngOnInit() {
  }

}
