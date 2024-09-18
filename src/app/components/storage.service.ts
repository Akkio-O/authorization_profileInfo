import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MockLocalStorageService {
    private delayTime = 1000;

    constructor() { }

    getItem(key: string): Observable<any> {
        const data = localStorage.getItem(key);
        return of(data ? JSON.parse(data) : null).pipe(delay(this.delayTime));
    }

    setItem(key: string, value: any): Observable<void> {
        localStorage.setItem(key, JSON.stringify(value));
        return of(undefined).pipe(delay(this.delayTime));
    }
    
    removeItem(key: string): Observable<void> {
        localStorage.removeItem(key);
        return of(undefined).pipe(delay(this.delayTime));
    }
}
