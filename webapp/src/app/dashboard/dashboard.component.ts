import { Component, OnInit } from '@angular/core';
import { Match } from '../types';
import { evian } from '../evian';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  matches: Match[] = [];
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches()
      .subscribe(matches => {
        this.matches = matches.slice(0, 4).map(match => new Match(match.id, match.players, match.winner, match.deckNames));
      });
  }
}
