import { Component, OnInit } from '@angular/core';
import { BlocketWebDataService } from '../../blocket-web-data.service';
import { Region } from 'src/app/core/models/region';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    regions$: Observable<Region[]>;

    constructor(private blocketService: BlocketWebDataService) { }

    ngOnInit() {
        this.regions$ = this.blocketService.regions;
        this.blocketService.getRegions();
    }

}
