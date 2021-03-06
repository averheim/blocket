import { Component, OnInit } from '@angular/core';
import { BlocketDataService } from '../../blocket-data.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/core/models/page';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    pages$: Observable<Page[]>;
    selectedPage: Page;

    constructor(private blocketService: BlocketDataService) { }

    ngOnInit() {
        this.pages$ = this.blocketService.pages;
    }

    choosePage(page: Page): void {
        this.selectedPage = page;
        this.blocketService.search(page.queryString);
    }
}
