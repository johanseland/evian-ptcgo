import { Component, OnInit } from '@angular/core';
import { evian } from '../evian';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  matches: evian.IMatch[] = [];
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches()
      .subscribe(matches => this.matches = matches);
  }
}
