import { Component, OnInit } from '@angular/core';
import { BlocketDataService } from '../../blocket-data.service';
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

    constructor(private blocketService: BlocketDataService) { }

    ngOnInit() {
        this.blocketService.getRegions();
        this.blocketService.search();
    }

    get isLoading(): boolean {
        return this.blocketService.isLoading;
    }

    get isSearchCompleted(): boolean {
        return this.blocketService.isSearchCompleted;
    }
}
