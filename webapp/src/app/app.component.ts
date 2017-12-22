import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './service/user-login.service';
import { CognitoService, LoggedInCallback } from './service/cognito.service';
import { AwsUtil } from './service/aws.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, LoggedInCallback {
  title = 'EvianTCG';
  loggedIn: Observable<boolean>;

  /*
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/match">Matches</a>
  <a routerLink="/decks">Decks</a>
  <a routerLink="/players">Players</a>
  */
  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/match', label: 'Matches' },
    { path: '/decks', label: 'Decks' },
    { path: '/players', label: 'Players' }
  ];

  constructor(
    public awsUtil: AwsUtil,
    public userService: UserLoginService,
    public cognito: CognitoService) {
    console.log('AppComponent: constructor');
    this.loggedIn = userService.loggedIn.asObservable();
  }

  ngOnInit() {
    console.log('AppComponent: Checking if the user is already authenticated');
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    console.log('AppComponent: the user is authenticated: ' + isLoggedIn);
    console.log('isLoggedIn: ' + this.loggedIn);
    const self = this;
    this.cognito.getIdToken({
      callback() {},
      callbackWithParam(token: any) {
        // Include the passed-in callback here as well so that it's executed downstream
        console.log('AppComponent: calling initAwsService in callback');
        self.awsUtil.initAwsService(null, isLoggedIn, token);
      }
    });
  }
}
