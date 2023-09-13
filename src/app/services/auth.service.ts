import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn() {
    let hasToken = false;
    if (sessionStorage.getItem('userId') != '') {
      hasToken = true;
    }
    return hasToken;
  }
}
