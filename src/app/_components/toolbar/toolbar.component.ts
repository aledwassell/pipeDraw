import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ColorGenService} from "../../_services/color-gen.service";
import {WebsocketService} from "../../_services/websocket.service";
import {Color} from "../../_interfaces/color";

@Component({
    selector: 'app-toolbar',
    templateUrl: '/toolbar.component.html',
    styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
    private brushSize: number;
    public arrayColors: any = [
        {hex: this.colorGen.randColor, type: 'pen'}
    ];
    private swatches = new FormGroup({
        bkg: new FormControl(),
        c: new FormControl()
    });
    constructor(private webSocket: WebsocketService,
                private colorGen: ColorGenService) {
        this.brushSize = 20;
    }
    ngOnInit() {
        this.webSocket.getBrushSize().subscribe(
            s => this.brushSize = s
        );
    }
    addColor(): void {
        this.arrayColors.push({hex: this.colorGen.randColor});
    }
    removeColor(): void {
        this.arrayColors.pop();
    }
    randomize(indx: number, type: string) {
        const color = this.colorGen.randColor;
        if (type === 'pen') {
            this.arrayColors[indx].hex = color;
        }
        if (type === 'background') {
            this.backgroundColor.hex = color;
        }
        this.onColorChange({hex: color});
    }

    onColorChange(e: Color): void {
        this.webSocket.emitColorChange(e);
    }

    brushSizeChange(evt): void {
        this.brushSize = evt.value;
        this.webSocket.emitBrushSizeChange({brushSize: evt.value});
    }
}
