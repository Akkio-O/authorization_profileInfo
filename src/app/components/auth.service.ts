import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('userData');
      }
      return false;
  }
}
