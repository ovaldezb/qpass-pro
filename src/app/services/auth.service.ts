import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public getToken(): string | null {
    for (let i = 0; i < localStorage.length; i++) {
      if (
        localStorage.key(i)?.endsWith('idToken') &&
        localStorage.key(i)?.includes(environment.clientId)
      ) {
        return localStorage.getItem(
          localStorage.key(i) ? 'localStorage.key(i)' : ''
        );
      }
    }
    return null;
  }
}
