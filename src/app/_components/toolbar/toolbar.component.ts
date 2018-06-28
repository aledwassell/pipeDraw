import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms"
import {Observable } from "rxjs/index"
import { FormControl } from "@angular/forms"
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
                             [style.background]="color.color"/>
                  </section>
              </form>
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
    onColorChange(): void {
        this.swatches.valueChanges.subscribe(
            val => {
                this.webSocket.colorChange(this.swatches.a.value)
            }
        );
    }

  ngOnInit() {
      this.onColorChange();
  }

}
