import { Component, OnInit } from '@angular/core';
import { BlocketWebDataService } from '../../blocket-web-data.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/core/models/page';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

    pages$: Observable<Page[]>;

    constructor(private blocketService: BlocketWebDataService) { }

    ngOnInit() {
        this.pages$ = this.blocketService.pages;

    }

}
