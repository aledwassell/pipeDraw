import { Component, OnInit } from '@angular/core';
import { GetPhotosService } from "../../_services/get-photos.service"

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private getPhotos: GetPhotosService) { }

  ngOnInit() {
    this.getPhotos.getPhotos()
        .subscribe(data => console.log(data));
  }

}
