import { Component, OnInit, ViewChild } from '@angular/core';
import { IMatch, Match } from '../types';
import { MatchService } from '../match.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  displayedColumns = ['id', 'opponent', 'result', 'deckName'];
  dataSource: MatTableDataSource<IMatch> = new MatTableDataSource<IMatch>();

  matches: IMatch[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchService: MatchService) { }

  getMatches(): void {
    this.matchService.getMatches().subscribe(matches => {
        this.matches = matches.map(match => createIMatch(match));

        console.log(this.matches);
        this.dataSource.data = this.matches;

      }
    );
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getMatches();
    }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    console.log('applyFilter');
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

function createIMatch(match: Match): IMatch {
  return {
    id: match.id,
    opponent: match.players[1],
    result: match.winner === 0 ? 'Victory' : 'Defeat',
    deckName: match.deckNames ? match.deckNames[0] : ''
  };
}
