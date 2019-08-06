import { Component, OnInit } from '@angular/core';
import { BlocketWebDataService } from '../../blocket-web-data.service';
import { Observable } from 'rxjs';
import { Region } from 'src/app/core/models/region';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    regions$: Observable<Region[]>;
    searchTerm: string;

    constructor(private blocketService: BlocketWebDataService) { }

    ngOnInit() {
        this.regions$ = this.blocketService.regions;
        this.blocketService.getRegions();
    }

    

}
