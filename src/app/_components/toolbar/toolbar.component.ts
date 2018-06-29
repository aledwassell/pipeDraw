import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ColorGenService} from "../../_services/color-gen.service";
import {WebsocketService} from "../../_services/websocket.service";

@Component({
    selector: 'app-toolbar',
    template: `
        <mat-accordion>
            <mat-expansion-panel>
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        Colours
                    </mat-panel-title>
                    <mat-panel-description>

                    </mat-panel-description>
                </mat-expansion-panel-header>
                <form [formGroup]="swatches">
                    <section>
                        Background colors 
                    </section>
                    <section>
                        <div class="background-container">
                            <input formControlName="bkg"
                                   class="swatch"
                                   [cpPosition]="'bottom'"
                                   [(colorPicker)]="color"
                                   (colorPickerChange)="onColorChange($event)"
                                   [style.background]="color"/>
                            <button mat-button>Randomize</button>
                        </div>
                        <mat-divider></mat-divider>
                    </section>
                    <section>
                        Pen colors
                        <button mat-icon-button (click)="addColor()" [disabled]="arrayColors.length >= 4">
                            <mat-icon aria-label="Add color">add</mat-icon>
                        </button>
                    </section>
                    <section *ngFor="let color of arrayColors; index as i">
                        <div class="color-container">
                            <input formControlName="c"
                                   class="swatch"
                                   [cpPosition]="'bottom'"
                                   [(colorPicker)]="color.color"
                                   (colorPickerChange)="onColorChange($event)"
                                   [style.background]="color.color"/>
                            <button mat-button (click)="randomize(i)">Randomize</button>
                        </div>
                        <mat-divider *ngIf="arrayColors.length > 1"></mat-divider>
                    </section>
                </form>
            </mat-expansion-panel>
        </mat-accordion>
        <app-chat></app-chat>
    `,
    styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

    constructor(private webSocket: WebsocketService,
                private colorGen: ColorGenService) {
    }

    public arrayColors: any = [
        {color: this.colorGen.randColor}
    ];

    swatches = new FormGroup({
        bkg: new FormControl(),
        c: new FormControl()
    });

    addColor(): void {
        this.arrayColors.push({color: this.colorGen.randColor});
    }

    randomize(indx: number) {
        this.arrayColors[indx].color = this.colorGen.randColor;
    }

    onColorChange(e): void {
        this.webSocket.colorChange(e);
    }

    ngOnInit() {
    }

}
