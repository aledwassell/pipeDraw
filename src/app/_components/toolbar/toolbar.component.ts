import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ColorGenService} from "../../_services/color-gen.service";
import {WebsocketService} from "../../_services/websocket.service";
import {Color} from "../../_interfaces/color";

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
                                   (colorPickerChange)="onColorChange({color: $event, type: 'background'})"
                                   [style.background]="color"/>
                            <button mat-button (click)="randomize(i, 'background')">Randomize</button>
                        </div>
                        <mat-divider></mat-divider>
                    </section>
                    <section>
                        Pen colors
                        <button mat-icon-button (click)="addColor()" [disabled]="arrayColors.length >= 4">
                            <mat-icon aria-label="Add color">add_circle</mat-icon>
                        </button>
                        <button mat-icon-button (click)="removeColor()" *ngIf="arrayColors.length >= 2">
                            <mat-icon aria-label="Remove color">remove_circle</mat-icon>
                        </button>
                    </section>
                    <section *ngFor="let color of arrayColors; index as i">
                        <div class="color-container">
                            <input formControlName="c"
                                   class="swatch"
                                   [cpPosition]="'bottom'"
                                   [(colorPicker)]="color.color"
                                   (colorPickerChange)="onColorChange({color: $event, type: 'pen'})"
                                   [style.background]="color.color"/>
                            <button mat-button (click)="randomize(i, 'pen')">Randomize</button>
                            <button mat-button (click)="rainbowize()">Rainbowize</button>
                        </div>
                        <mat-divider *ngIf="arrayColors.length > 1"></mat-divider>
                    </section>
                </form>
            </mat-expansion-panel>
        </mat-accordion>
        <mat-card>
            <section style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; height: 100px;">
                <mat-slider (input)="brushSizeChange($event)" [(ngModel)]="brushSize"></mat-slider>
                <p *ngIf="brushSize < 40">
                    <input [(ngModel)]="brushSize" style="border: none; text-align: right; width: 20px; font-size: 16px;">px
                </p>
                <div [ngStyle]="{'width.px': brushSize, 'height.px': brushSize, 'background-color': '#333333'}">
                    <p *ngIf="brushSize > 40">
                        <input [(ngModel)]="brushSize" style="border: none; text-align: right; width: 20px; font-size: 16px; background-color: #333333; color: #ffffff">px
                    </p>
                </div>
            </section>
        </mat-card>
        <app-chat></app-chat>
    `,
    styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
    brushSize: number;
    constructor(private webSocket: WebsocketService,
                private colorGen: ColorGenService) {
        this.brushSize = 20;
    }
    public arrayColors: any = [
        {hex: this.colorGen.randColor, type: 'pen'}
    ];
    swatches = new FormGroup({
        bkg: new FormControl(),
        c: new FormControl()
    });
    addColor(): void {
        this.arrayColors.push({hex: this.colorGen.randColor, type: 'pen'});
    }
    removeColor(): void {
        this.arrayColors.pop();
    }
    randomize(indx: number, type: string) {
        const color = this.colorGen.randColor;
        this.arrayColors[indx].hex = color;
        this.onColorChange({hex: color, type: type});
    }

    rainbowize(): void {
        this.webSocket.rainbowize();
    }

    onColorChange(e: Color): void {
        this.webSocket.emitColorChange(e);
    }

    brushSizeChange(evt): void {
        this.brushSize = evt.value;
        this.webSocket.emitBrushSizeChange(evt.value);
    }

    ngOnInit() {
        this.webSocket.getBrushSize().subscribe(
            s => this.brushSize = s
        );
    }

}
