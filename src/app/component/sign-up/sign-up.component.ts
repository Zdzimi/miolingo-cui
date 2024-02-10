import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigningUser } from 'src/app/model/signingUser';
import { SubmittedUser } from 'src/app/model/submittedUser';
import { ViolationsResponse } from 'src/app/model/violationsResponse';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signingUser = new SigningUser();
  submittedUser: SubmittedUser | undefined;
  violationsResponse: ViolationsResponse | undefined;
  signingInProgress = false;
  emailPlaceholder = 'e-mail';
  namePlaceholder = 'name';
  passwordPlaceholder = 'password';
  mailException: string | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (this.authService.signedIn) {
      this.router.navigate(['/main']);
    }
  }

  signUp(): void {
    this.signingInProgress = true;
    this.clearViolationsMessages();
    this.httpService.signUp(this.signingUser).subscribe(
      res => {
        this.submittedUser = res;
      },
      err => {
        this.signingInProgress = false;
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.emailPlaceholder = err.error;
            this.signingUser.email = "";
          } else if (err.status === 400) {
            this.violationsResponse = err.error;
            this.setViolationsMessages();
          } else if (err.status === 502) {
            this.mailException = err.error;
          }
        }
      }
    );
  }

  clearViolationsMessages(): void {
    this.emailPlaceholder = 'e-mail';
    this.namePlaceholder = 'name';
    this.passwordPlaceholder = 'password';
  }

  setViolationsMessages(): void {
    if (this.violationsResponse?.violations) {
      for (const violation of this.violationsResponse.violations) {
        switch (violation.fieldName) {
          case 'name':
            this.namePlaceholder = violation.message;
            this.signingUser.name = "";
            break;
          case 'email':
            this.emailPlaceholder = violation.message;
            this.signingUser.email = "";
            break;
          case 'password':
            this.passwordPlaceholder = violation.message;
            this.signingUser.password = "";
            break;
        }
      }
    }

  }

}
