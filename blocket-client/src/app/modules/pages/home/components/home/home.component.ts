import { Component, OnInit } from '@angular/core';
import { BlocketWebDataService } from '../../blocket-web-data.service';
import { Observable } from 'rxjs';
import { Region } from 'src/app/core/models/region';
import { Ad } from 'src/app/core/models/ad';
import { Page } from 'src/app/core/models/page';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    regions$: Observable<Region[]>;
    ads$: Observable<Ad[]>;
    pages$: Observable<Page[]>;
    searchTerm: string;

    constructor(private blocketService: BlocketWebDataService) { }

    ngOnInit() {
        this.regions$ = this.blocketService.regions;
        this.ads$ = this.blocketService.ads;
        this.pages$ = this.blocketService.pages;
        this.blocketService.getRegions();
        this.blocketService.search();
    }

    search(): void {

    }

}
