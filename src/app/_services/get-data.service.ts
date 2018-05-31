import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Generic } from "../_interfaces/generic_data"
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Generic[]> {
    return this.http.get<Generic[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
