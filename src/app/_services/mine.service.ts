import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor() {
    this.listen();
    console.log('Hello');
  }
  listen(): void {

  }
}
