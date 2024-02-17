import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/model/credentials';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  credentials = new Credentials();
  emailPlaceholder = 'email';
  passwordPlaceholder = 'password';
  signInFailedInfo: string | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.authService.signedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  signIn(): void {
    this.authService.setCredentials(this.credentials);
    this.httpService.signIn().subscribe(
      res => {
        this.userService.setUser(res);
        this.router.navigate(['/dashboard']);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.signInFailedInfo = 'Bad credentials';
          }
        }
        this.authService.clearCredentials();
        this.credentials = new Credentials();
      }
    )
  }

}
