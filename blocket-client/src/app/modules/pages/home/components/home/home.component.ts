import { Component, OnInit } from '@angular/core';
import { BlocketWebDataService } from '../../blocket-web-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private blocketService: BlocketWebDataService) { }

    page$: Observable<any>;

    ngOnInit() {
        this.page$ = this.blocketService.page;
        this.blocketService.getBlocket();
    }

}
