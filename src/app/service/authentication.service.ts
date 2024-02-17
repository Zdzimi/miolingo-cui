import { Injectable } from '@angular/core';
import { Credentials } from '../model/credentials';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signedIn = false;
  signedInObs = new BehaviorSubject<boolean>(this.signedIn);

  constructor() {
    this.signedIn = !!localStorage.getItem('auth');
    this.signedInObs.next(this.signedIn);
  }

  getSignedInObs(): Observable<boolean> {
    return this.signedInObs.asObservable();
  }

  setCredentials(credentials: Credentials): void {
    localStorage.setItem('auth', btoa(`${credentials.email}:${credentials.password}`));
    this.setSignedInStatus(true);
  }

  clearCredentials(): void {
    localStorage.removeItem('auth');
    this.setSignedInStatus(false);
  }

  private setSignedInStatus(value: boolean): void {
    this.signedIn = value;
    this.signedInObs.next(this.signedIn);
  }

  createBasicAuth(): string {
    return 'Basic ' + localStorage.getItem('auth');
  }

}
