import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as P5 from "p5";
import { Message } from '../model/websocket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsocketService } from '../model/websocket.service';

const COLOR = '#000000';

@Component({
  selector: 'easle',
  template: '<div #canvas></div>',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  private p5: any;
  private subject = new Subject();
  constructor(private dataService: WebsocketService) { }

  ngOnInit() {

    this.dataService.messageSocket
      .asObservable()
      .pipe(takeUntil(this.subject))
      .subscribe(
        d => {
          if (!d.x || !d.y) return
          this.draw(d);
        }
      );
  }

  ngAfterViewInit() {
    this.createCanvas();
    this.drawFunction();
  }

  private createCanvas() {
    this.p5 = new P5(this.sketch, this.canvas.nativeElement);
  }

  private sketch(p: any) {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(255);
    };
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  }

  private drawFunction = () => {
    this.p5.mouseDragged = () => {
      this.p5.fill(COLOR);
      this.p5.noStroke();
      this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 10, 10);
      this.dataService.messageSocket.next({ x: this.p5.mouseX, y: this.p5.mouseY });
    };
  }

  private draw(data: Message) {
    if (!data.x && !data.y) return;
    this.p5.draw = () => {
      this.p5.fill(data.color || COLOR);
      this.p5.noStroke();
      this.p5.ellipse(data.x, data.y, 10, 10);
    };
  }

}
