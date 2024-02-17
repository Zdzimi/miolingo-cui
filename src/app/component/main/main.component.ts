import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user!: User;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.userService.getUserObs().subscribe((value: User) => {
      this.user = value;
    });
  }

  ngOnInit(): void {
    if (!this.authService.signedIn) {
      this.router.navigate(['/sign-in']);
    }
  }

}
