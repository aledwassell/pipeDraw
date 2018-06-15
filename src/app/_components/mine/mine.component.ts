import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/index";

@Component({
  selector: 'app-mine',
  template: `
    Time: {{time | async}}
  `,
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

  constructor() { }
    time = new Observable(observer =>
        setInterval(() => observer.next(new Date().toString()), 1000)
    );

  ngOnInit() {
  }

}
