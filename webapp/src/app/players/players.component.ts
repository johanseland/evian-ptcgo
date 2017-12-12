import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../match.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { evian } from '../evian';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit, AfterViewInit {
  players: evian.IPlayer[];
  displayedColumns = ['id', 'playerName'];
  dataSource: MatTableDataSource<evian.IPlayer> = new MatTableDataSource<evian.IPlayer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchService: MatchService) { }

  getPlayers(): void {
    this.matchService.getPlayers().subscribe(players => {
        this.players = players;
        this.dataSource.data = this.players;
      }
    );
  }

  ngOnInit() {
    this.getPlayers();
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
