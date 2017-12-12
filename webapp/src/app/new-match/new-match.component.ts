import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormArrayName } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { NewMatch } from '../types';
import { MatchService } from '../match.service';
import { DeckListParser } from '../parseDeck';
import { evian } from '../evian';

class MatchResultState {
  public key = -1;
  constructor(public description: string, public isVictory: boolean, public victoryCondition: evian.VictoryCondition) {}
}

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})

export class NewMatchComponent implements OnInit {
  newMatch: NewMatch;
  players: evian.IPlayer[] = []; // For suggestions

  private matchResultKey = -1;

  get title(): string {
    if (!this.newMatch.opponent) {
      return 'New match';
    } else if (this.matchResultKey >= 0) {
      if (this.matchResultStates[this.matchResultKey].isVictory === true) {
        return 'Victory over ' + this.newMatch.opponent;
      } else {
        return 'Loss against ' + this.newMatch.opponent;
      }
    } else {
      return 'Match against ' + this.newMatch.opponent;
    }
  }

  matchResultStates: MatchResultState[] = [];

  constructor(private snackBar: MatSnackBar, private matchService: MatchService) {
    this.matchResultStates.push( new MatchResultState('Victory (all prize cards)', true, evian.VictoryCondition.PriceCards));
    this.matchResultStates.push( new MatchResultState('Victory (opponent conceded)', true, evian.VictoryCondition.Conceded));
    this.matchResultStates.push( new MatchResultState('Defeat (all prize cards)', false, evian.VictoryCondition.PriceCards));
    this.matchResultStates.push( new MatchResultState('Defeat (opponent conceded)', false, evian.VictoryCondition.Conceded));

    // Set up reverse mapping so that matchResultValue can lookup the active MatchResultState
    this.matchResultStates.forEach((element, index) => {
      element.key = index;
    });
  }

  ngOnInit() {
    this.newMatch = new NewMatch();
    this.newMatch.matchTime = new Date();
    this.getPlayers();
  }

  onNewMatchSubmitted() {
    const winnerName = this.matchResultStates[this.matchResultKey].isVictory ? 'CMDREvian' : this.newMatch.opponent;

    const match = evian.CreateMatch('CMRDEvian', this.newMatch.opponent, winnerName, this.matchResultKey, this.newMatch.matchTime);
    match.player1DeckName = this.newMatch.deckName;
    match.player2DeckName = this.newMatch.opponentDeckName;

    let message = 'Better luck next time';
    if (this.matchResultStates[this.matchResultKey].isVictory) {
      message = 'Well played!';
    }

    console.log('deckList: ' + this.newMatch.deckList);

    if (this.newMatch.deckList) {
      const deckList = DeckListParser.parseDeckList(this.newMatch.deckList);
      this.matchService.updateDeckList(deckList).subscribe();
      match.player1DeckList = deckList.id;
    }

    if (this.newMatch.opponentDeckList) {
      const deckList = DeckListParser.parseDeckList(this.newMatch.opponentDeckList);
      this.matchService.updateDeckList(deckList).subscribe();
      match.player2DeckList = deckList.id;
    }

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    console.log(match);
    this.matchService.updateMatch(match).subscribe();

    this.matchService.getPlayer(this.newMatch.opponent)
      .subscribe(player => {
        if (player.length === 0) {
          console.log('Adding new player ' + this.newMatch.opponent);
          this.matchService.updatePlayer(evian.CreatePlayer(this.newMatch.opponent)).subscribe();
        }
      });
  }

  getPlayers(): void {
    this.matchService.getPlayers()
    .subscribe(players => {
      this.players = players;
      console.log(players);
    });
  }

}
