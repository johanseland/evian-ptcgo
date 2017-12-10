import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../match.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { evian } from '../evian';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})

export class DecksComponent implements OnInit, AfterViewInit {
  deckLists: evian.IDeckList[];
  displayedColumns = ['id', 'pokemons', 'trainers', 'energies'];
  dataSource: MatTableDataSource<evian.IDeckList> = new MatTableDataSource<evian.IDeckList>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchService: MatchService) { }

  getDeckLists(): void {
    this.matchService.getDeckLists().subscribe(deckLists => {
        this.deckLists = deckLists;//deckLists.map(deckList => new DeckList(deckList);
        console.log(this.deckLists);
        this.dataSource.data = this.deckLists;
      }
    );
  }

  ngOnInit() {
    this.getDeckLists();
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
