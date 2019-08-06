import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlocketWebDataService {

    private pageSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private page$: Observable<any> = this.pageSource.asObservable();

    constructor(private http: HttpClient) { }


}
