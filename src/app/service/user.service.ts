import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User();
  userObs = new BehaviorSubject<User>(this.user);

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService
  ) {
    if (this.authService.signedIn) {
      this.httpService.signIn().subscribe(
        res => this.setUser(res)
      );
    }
  }

  getUserObs(): Observable<User> {
    return this.userObs.asObservable();
  }

  setUser(user: User): void {
    this.user = user;
    this.userObs.next(this.user);
  }

}
