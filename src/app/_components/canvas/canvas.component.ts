import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../../_services/websocket.service';
import {ColorGenService} from '../../_services/color-gen.service';
import {Sketch} from '../../_interfaces/sketch';
import {Color} from '../../_interfaces/color';
import { Subscription} from 'rxjs/index';
import * as P5 from "p5";

@Component({
    selector: 'app-canvas',
    template: `
        {{sketchData | json}}
        <div id="canvas"></div>
    `,
    styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
    sub: Subscription;
    sketchData: any;
    color: Color;
    background: Color;
    BrushSize: number;
    private p5;
    constructor(private webSocket: WebsocketService,
                private colorGen: ColorGenService) {
        this.BrushSize = 20;
        this.color = {hex: this.colorGen.randColor};
    }
    ngOnInit() {
        this.createCanvas();
        this.drawFunction();
        this.sub = this.webSocket.getSketchData()
            .subscribe(
                data => {
                    console.log(data);
                    this.draw(data);
                    this.sketchData = data;
                }
            );
    }
    private drawFunction = () => {
        this.p5.mouseDragged = () => {
            this.p5.fill(this.color.hex);
            this.p5.noStroke();
            this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, this.BrushSize, this.BrushSize);
            this.webSocket.emitDrawData({x: this.p5.mouseX, y: this.p5.mouseY});
        };
    }
    private createCanvas() {
        this.p5 = new P5(this.sketch);
    }
    private sketch(p: any) {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
            p.background(255);
        };
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    }
    private draw(data: Sketch) {
        this.p5.draw = () => {
            this.p5.fill(this.color.hex);
            this.p5.noStroke();
            this.p5.ellipse(data.x, data.y, this.BrushSize, this.BrushSize);
        };
    }
}
