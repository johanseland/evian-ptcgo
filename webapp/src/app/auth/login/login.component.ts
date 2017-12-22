import { Component, OnInit } from '@angular/core';
import { CognitoCallback, LoggedInCallback } from '../../service/cognito.service';
import { UserLoginService } from '../../service/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
  implements OnInit, CognitoCallback, LoggedInCallback {
  errorMessage: string;
  email: string;
  password: string;

  isSubmitted = false;

  constructor(public router: Router, public userService: UserLoginService) {
    console.log('LoginComponent constructor');
  }

  ngOnInit() {
    this.errorMessage = null;
    console.log(
      'Checking if the user is already authenticated. If so, then redirect to the secure site'
    );
    this.userService.isAuthenticated(this);
  }

  onLogin() {
    if (this.email == null || this.password == null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.isSubmitted = true;
    this.errorMessage = null;
    this.userService.authenticate(this.email, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
    console.log('cognitoCallback');
    this.isSubmitted = false;
    if (message != null) {
      // error
      this.errorMessage = message;
      console.log('result: ' + this.errorMessage);
      if (this.errorMessage === 'User is not confirmed.') {
        console.log('redirecting');
        this.router.navigate(['/home/confirmRegistration', this.email]);
      } else if (this.errorMessage === 'User needs to set password.') {
        console.log('redirecting to set new password');
        this.router.navigate(['/home/newPassword']);
      }
    } else {
      // success
      // this.ddb.writeLogEntry('login');
      this.router.navigate(['/']);
    }
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}
