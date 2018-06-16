import { Component, OnInit } from '@angular/core';
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
        p.setup = () => {
            p.createCanvas(800, 600);
        };

        p.draw = () => {
            p.background(200);
            p.fill(255);
            p.noStroke();
            p.ellipse(400, 300, 50, 50);
        };
    }

}
