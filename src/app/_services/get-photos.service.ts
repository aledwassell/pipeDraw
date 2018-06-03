import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { photoSet } from "../_interfaces/photo_set"
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetPhotosService {
  private setId: string = '72157663434459275';
  constructor(private http: HttpClient) { }

  getPhotos(): Observable<photoSet[]> {
    return this.http.post<photoSet[]>('/api/sets', this.setId);
  }
}
