import { Component, OnInit } from '@angular/core';
import { GetDataService } from "../../_services/get-data.service";
import { Generic } from "../../_interfaces/generic_data";
import { Observable } from "rxjs/index";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private getService: GetDataService) { }

  getData(): void {
    this.getService.getData()
        .subscribe(data => console.log(data));
  }

  ngOnInit() {

      this.getData();
  }

}
