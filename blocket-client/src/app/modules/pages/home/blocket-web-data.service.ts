import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/core/models/region';
import _ from 'lodash';
import { Ad } from 'src/app/core/models/ad';
import { Page } from 'src/app/core/models/page';

@Injectable({
    providedIn: 'root'
})
export class BlocketWebDataService {
    private loading = false;

    private regionsSource: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>([]);
    private regions$: Observable<Region[]> = this.regionsSource.asObservable();

    private adsSource: BehaviorSubject<Ad[]> = new BehaviorSubject<Ad[]>([]);
    private ads$: Observable<Ad[]> = this.adsSource.asObservable();

    private paginationSource: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>([]);
    private pages$: Observable<Page[]> = this.paginationSource.asObservable();


    constructor(private http: HttpClient) { }

    get regions(): Observable<Region[]> {
        return this.regions$;
    }

    get ads(): Observable<Ad[]> {
        return this.ads$;
    }

    get pages(): Observable<Page[]> {
        return this.pages$;
    }

    get isLoading(): boolean {
        return this.loading;
    }

    getRegions(): void {
        this.loading = true;

        this.http.get<Region[]>(`${environment.blocketAPIBaseUrl}/regions`).pipe(
            map((response: Region[]) => {
                const regions = [];
                response.map(region => regions.push(_.defaults(new Region(), region)));
                console.log(response);
                console.log(regions);
                return regions;
            })
        ).toPromise()
        .then(response => {
            this.regionsSource.next(response);
            this.loading = false;
        })
        .catch(error => {
            console.log(error);
            this.loading = false;
        });
    }

    search(queryString: string = ''): void {
        this.loading = true;
        this.http.get<any>(`${environment.blocketAPIBaseUrl}/search${queryString}`).pipe(
            map(response => {
                const ads = [];
                const pages = [];
                console.log(response);
                response.ads.map(ad => ads.push(_.defaults(new Ad(), ad)));
                response.pagination.map(page => pages.push(_.defaults(new Page(), page)));
                console.log(ads);
                return { ads, pages };
            })
        ).toPromise()
        .then(response => {
            this.adsSource.next(response.ads);
            this.paginationSource.next(response.pages);
            this.loading = false;
        })
        .catch(error => {
            console.log(error);
            this.loading = false;
        });
    }


}
