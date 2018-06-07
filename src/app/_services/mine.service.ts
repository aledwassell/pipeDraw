import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor() { }
  listen(): Observable {
    const observable = new Observable((observer) => {

    });
  }
}
