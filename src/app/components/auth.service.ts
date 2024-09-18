import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockLocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: MockLocalStorageService) { }

  isAuthenticated(): Observable<boolean> {
    return this.storageService.getItem('userData').pipe(
      map(data => !!data)
    );
  }
  login(user: { email: string, password: string }): Observable<boolean> {
    return this.storageService.getItem('userData').pipe(
      map(data => {
        if (data && data.email === user.email && data.password === user.password) {
          return true;
        }
        return false;
      })
    );
  }
  register(data: any): Observable<boolean> {
    return this.storageService.setItem('userData', data).pipe(
      map(() => true),
    );
  }

  logout(): Observable<void> {
    return this.storageService.removeItem('userData');
  }
}
