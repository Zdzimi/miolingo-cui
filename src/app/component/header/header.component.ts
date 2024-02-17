import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedIn!: boolean;
  user!: User;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.authService.getSignedInObs().subscribe((value: boolean) => this.loggedIn = value);
    this.userService.getUserObs().subscribe((value: User) => this.user = value);
  }

  logout(): void {
    this.httpService.logout().subscribe(
      res => {
        this.userService.setUser(new User());
        this.authService.clearCredentials();
        this.router.navigate(['/sign-in']);
      },
      err => {
        this.userService.setUser(new User());
        this.authService.clearCredentials();
        this.router.navigate(['/sign-in']);
      }
    );
  }

}
