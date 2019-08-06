import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/core/models/region';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class BlocketWebDataService {

    private regionsSource: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>([]);
    private regions$: Observable<Region[]> = this.regionsSource.asObservable();

    constructor(private http: HttpClient) { }

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

    get regions(): Observable<Region[]> {
        return this.regions$;
    }
}
