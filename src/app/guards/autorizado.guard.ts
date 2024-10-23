import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('ingresado') === 'true';
    
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige a la página de login
      return false;
    }
    return true;
  }
}
