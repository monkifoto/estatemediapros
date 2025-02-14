import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {  // Updated return type
    return this.authService.isLoggedIn().pipe(
      take(1),
      map(isLoggedIn => isLoggedIn ? true : this.router.createUrlTree(['/login'])) // Fixed type issue
    );
  }
}
