import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Use Modular SDK injection
  user$: Observable<any>; // Observable for authentication state

  constructor(private router: Router) {
    // Convert Firebase auth state into an observable
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      }, (error) => {
        subscriber.error(error);
      }, () => {
        subscriber.complete();
      });
    });
  }

  /**
   * Login method using signInWithEmailAndPassword from Firebase Modular SDK
   */
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.router.navigate(['/admin']);
          observer.next(userCredential.user);
          observer.complete();
        })
        .catch((error) => {
          console.error('Login error:', error);
          observer.error(error);
        });
    });
  }

  /**
   * Logout method using signOut from Firebase Modular SDK
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Check if a user is logged in, returning an observable boolean
   */
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}
