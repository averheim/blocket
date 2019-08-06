import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/core/models/region';
import _ from 'lodash';
import { Ad } from 'src/app/core/models/ad';

@Injectable({
    providedIn: 'root'
})
export class BlocketWebDataService {

    private regionsSource: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>([]);
    private regions$: Observable<Region[]> = this.regionsSource.asObservable();

    private adsSource: BehaviorSubject<Ad[]> = new BehaviorSubject<Ad[]>([]);
    private ads$: Observable<Ad[]> = this.adsSource.asObservable();

    constructor(private http: HttpClient) { }

    get regions(): Observable<Region[]> {
        return this.regions$;
    }

    get ads(): Observable<Ad[]> {
        return this.ads$;
    }

    getRegions(): void {
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
        })
        .catch(error => console.log(error));
    }

    getAds(): void {
        this.http.get<any>(`${environment.blocketAPIBaseUrl}/search`).pipe(
            map(response => {
                const ads = [];
                console.log(response);
                response.ads.map(ad => ads.push(_.defaults(new Ad(), ad)));
                console.log(ads);
                return ads;
            })
        ).toPromise()
        .then(response => {
            this.adsSource.next(response);
        })
        .catch(error => console.log(error));
    }
}
