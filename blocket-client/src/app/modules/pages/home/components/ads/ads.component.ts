import { Component, OnInit } from '@angular/core';
import { BlocketDataService } from '../../blocket-data.service';
import { Observable } from 'rxjs';
import { Ad } from 'src/app/core/models/ad';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

    ads$: Observable<Ad[]>;

    constructor(private blocketService: BlocketDataService) { }

    ngOnInit() {
        this.ads$ = this.blocketService.ads;
    }

    get hasAds(): boolean {
        return this.blocketService.hasAds;
    }

    get isSearchCompleted(): boolean {
        return this.blocketService.isSearchCompleted;
    }


}
