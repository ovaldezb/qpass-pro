import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({ bypassCache: false })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          this.router.navigate(['/']);
          resolve(false);
        });
    });
  }
}
