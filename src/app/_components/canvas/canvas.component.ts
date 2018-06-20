import { Component, OnInit } from '@angular/core';
import { Pen } from "../../_interfaces/pen";
import { WebsocketService } from "../../_services/websocket.service";
import { Subscription } from "rxjs/index"
import * as P5 from 'p5';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  pen: Pen;
  sub: Subscription;
  p5: any;
  constructor(private webSocket: WebsocketService) { }

    ngOnInit() {
        this.createCanvas();
        // this.sub = this.webSocket.getData()
        //     .subscribe(d => {
        //         console.log(d);
        //         this.pen = d;
        //     });
    }


    private createCanvas() {
        this.p5 = new P5(this.sketch);
    }

    private sketch(p: any) {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
          p.background(255);
        };

        p.mouseDragged = () => {
            p.fill(0);
            p.noStroke();
            p.ellipse(p.mouseX, p.mouseY, 10, 10);
        };

        p.draw = () => {
        };
    }
}
