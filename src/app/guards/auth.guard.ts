import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({ bypassCache: false })
        .then(() => {
          this.router.navigate(['/home']);
          resolve(false);
        })
        .catch(() => {
          resolve(true);
        });
    });
  }
}
