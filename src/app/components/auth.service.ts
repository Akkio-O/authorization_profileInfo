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
        return data && data.email === user.email && data.password === user.password ? true : false;
      })
    );
  }
  register(data: any): Observable<boolean> {
    return this.storageService.getItem('userData').pipe(
      map(existingData => {
        if (existingData && existingData.email === data.email) {
          return false;
        } else {
          this.storageService.setItem('userData', data).subscribe();
          return true;
        }
      }),
    );
  }

  logout(): Observable<void> {
    return this.storageService.removeItem('userData');
  }
}
