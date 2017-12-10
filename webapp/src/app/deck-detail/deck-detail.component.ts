import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { evian } from '../evian';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatchService } from '../match.service';
import { MatPaginator, MatSort, MatTableDataSource, MatCardModule } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { pokemontcgapi } from '../pokemontcgapi';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit, AfterViewInit {
  @Input() deckList: evian.IDeckList;

  activeSets: pokemontcgapi.ISet[];
  pokemontcgapiCard: pokemontcgapi.ICard;

  displayedColumns = ['numCards', 'cardName'];
  dataSource: MatTableDataSource<evian.IDeckList> = new MatTableDataSource<evian.IDeckList>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSourcePokemon: MatTableDataSource<evian.ICard> = new MatTableDataSource<evian.ICard>();

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getDeckList();
  }

  getDeckList(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getDeckList(id)
      .subscribe(deckList => {
        this.deckList = deckList;
        this.dataSourcePokemon.data = this.deckList.pokemons;
        console.log(this.dataSourcePokemon.data);
      }
    );
  }

  showCardDetail(card: evian.ICard) {
    this.matchService.getPokemonCard(card)
      .subscribe(pokemontcgapiCard => {
        console.log(pokemontcgapiCard);
        this.pokemontcgapiCard = pokemontcgapiCard;
      });
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.dataSourcePokemon.paginator = this.paginator;
    this.dataSourcePokemon.sort = this.sort;
  }


}
