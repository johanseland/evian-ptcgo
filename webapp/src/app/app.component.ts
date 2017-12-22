import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './service/user-login.service';
import { CognitoService, LoggedInCallback } from './service/cognito.service';
import { AwsUtil } from './service/aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, LoggedInCallback {
  title = 'EvianTCG';
  /*
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/match">Matches</a>
  <a routerLink="/decks">Decks</a>
  <a routerLink="/players">Players</a>
  */
  isAuthenticated = false;

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
  }

  ngOnInit() {
    console.log('AppComponent: Checking if the user is already authenticated');
    this.userService.isAuthenticated(this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    console.log('AppComponent: the user is authenticated: ' + isLoggedIn);
    this.isAuthenticated = isLoggedIn;

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
