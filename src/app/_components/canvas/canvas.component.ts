import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../_services/chat.service";
import * as p5 from 'p5';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

    ngOnInit() {
        this.createCanvas();
    }


    private createCanvas() {
        this.p5 = new p5(this.sketch);
    }

    private sketch(p: any) {
    console.log(p);
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
          p.background(255);
        };

        p.draw = () => {
            p.fill(0);
            p.noStroke();
            p.ellipse(p.mouseX, p.mouseY, 50, 50);
        };
    }

}
