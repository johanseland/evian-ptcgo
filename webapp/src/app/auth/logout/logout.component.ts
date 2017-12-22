import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../../service/user-login.service';
import { LoggedInCallback } from '../../service/cognito.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ' '
})

export class LogoutComponent implements OnInit, LoggedInCallback {

  constructor(public router: Router,
              public userService: UserLoginService) {
    console.log('Logout');
    this.userService.isAuthenticated(this);
  }

  ngOnInit() {
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    console.log('Logout::isLoggedIn: ' + isLoggedIn);
    if (isLoggedIn) {
        this.userService.logout();
        this.router.navigate(['/']);
    }

    this.router.navigate(['/']);
}


}
