import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})

export class MatchDetailComponent implements OnInit {
  @Input() match: Match;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(id)
      .subscribe(match => this.match = new Match(match.id, match.players, match.winner, match.deckNames));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.matchService.updateMatch(this.match)
      .subscribe(() => this.goBack());
  }
}
