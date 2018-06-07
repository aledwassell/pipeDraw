import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import { of } from "rxjs/index"

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor() {
    this.listen();
    console.log('Hello');
  }
  listen(): void {
    const observable = Observable.of(1, 2, 3);

    const observer = {
        next: x => console.log(`got next ${x}`),
        error: e => console.log(`got error ${e}`),
        complete: () => console.log(`got complete`),
    };

    observable.subscribe(observer);

  }
}
