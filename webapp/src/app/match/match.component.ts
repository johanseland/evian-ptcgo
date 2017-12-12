import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../match.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { evian } from '../evian';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})

export class MatchComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'player1Name', 'player2Name', 'victoryCondition'];
  dataSource: MatTableDataSource<evian.IMatch> = new MatTableDataSource<evian.IMatch>();

  matches: evian.IMatch[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchService: MatchService) { }

  getMatches(): void {
    this.matchService.getMatches().subscribe(matches => {
        this.matches = matches;
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

  getPlayer1Style(match: evian.IMatch): string {
    return match.player1Name === match.winnerName ? 'green' : 'red';
  }

  getPlayer2Style(match: evian.IMatch): string {
    return match.player2Name === match.winnerName ? 'green' : 'red';
  }
}
