import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvianTCG';
/*
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/match">Matches</a>
  <a routerLink="/decks">Decks</a>
  <a routerLink="/players">Players</a>
  */
  navLinks = [
               {path: '/dashboard', label: 'Dashboard'},
               {path: '/match', label: 'Matches'},
               {path: '/decks', label: 'Decks'},
               {path: '/players', label: 'Players'}
              ];

}
