import { Injectable } from '@angular/core';
import { Match } from './types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap,  } from 'rxjs/operators';
import { evian } from './evian';
import { pokemontcgapi } from './pokemontcgapi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MatchService {
  private matchUrl = 'api/matches'; // URL to web api
  private playersUrl = 'api/players';
  private deckListsUrl = 'api/decklists';

  private ptcgoCodeToSetCode = new Map<string, string>();
  private pokemonapiIdToCard = new Map<string, pokemontcgapi.ICard>();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.matchUrl)
      .pipe(
        tap(heroes => this.log(`fetched matches`)),
        catchError(this.handleError('getMatches', []))
      );
  }

  getPlayers(): Observable<evian.IPlayer[]> {
    return this.http.get<evian.IPlayer[]>(this.playersUrl)
    .pipe(
      tap(x => this.log(`fetched players`)),
      catchError(this.handleError('getPlayers', []))
    );
  }

  getDeckLists(): Observable<evian.IDeckList[]> {
    return this.http.get<evian.IDeckList[]>(this.deckListsUrl)
    .pipe(
      tap(x => this.log(`fetched deckLists`)),
      catchError(this.handleError('getDecklists', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MatchService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      this.log(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET hero by id. Will 404 if id not found */
  getMatch(id: number): Observable<Match> {
    const url = `${this.matchUrl}/${id}`;
    return this.http.get<Match>(url).pipe(
      tap(_ => this.log(`fetched match id=${id}`)),
    catchError(this.handleError<Match>(`getMatch id=${id}`))
    );
  }

  resolvePokemonId(card: evian.ICard): Observable<string> {
    if (this.ptcgoCodeToSetCode.has(card.expansion)) {
      const s = this.ptcgoCodeToSetCode.get(card.expansion) + '-' + card.collectionNumber;
      console.log('resolvePokemonId: cache hit');
      return of(s);
    } else {
      console.log('resolvePokemonId: cache miss');
      const url =  pokemontcgapi.url + 'sets?ptcgoCode=' + card.expansion;
      return this.http.get<pokemontcgapi.ISets>(url)
        .map(iset => iset.sets[0].code)
        .pipe(tap(setCode => { this.ptcgoCodeToSetCode.set(card.expansion, setCode); }))
        .map(setCode => setCode + '-' + card.collectionNumber);
    }
  }

  resolvePokemon(pokemonId: Observable<string>): Observable<pokemontcgapi.ICard> {
    return pokemonId.flatMap(id => {
      if (this.pokemonapiIdToCard.has(id)) {
        console.log('pokemonapiIdToCard cache hit');
        return of(this.pokemonapiIdToCard.get(id));
      } else {
        console.log('pokemonapiIdToCard cache miss id:' + id);
        const url =  pokemontcgapi.url + 'cards?id=' + id;
        return this.http.get<pokemontcgapi.ICards>(url)
          .map(icards => icards.cards[0])
          .pipe(tap(icard => this.pokemonapiIdToCard.set(id, icard)),
                catchError(this.handleError<pokemontcgapi.ICard>('error')));
      }
    });
  }

  getPokemonCard(card: evian.ICard): Observable<pokemontcgapi.ICard> {
    return this.resolvePokemon(this.resolvePokemonId(card));
  }

  getDeckList(id: number): Observable<evian.IDeckList> {
    const url = `${this.deckListsUrl}/${id}`;

    return this.http.get<evian.IDeckList>(url).pipe(
      tap(_ => this.log(`fetched deckList id=${id}`)),
    catchError(this.handleError<evian.IDeckList>(`getDeckList id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateMatch (match: Match): Observable<any> {
    console.log(match);
    return this.http.put(this.matchUrl, match, httpOptions)
    .pipe(
      tap(_ => this.log(`updated match id=${match.id}`)),
      catchError(this.handleError<any>('updateMatch'))
    );
  }

  /** PUT: update the hero on the server */
  updateDeckList (deckList: evian.IDeckList): Observable<any> {
    console.log('updateDeckList: ' + deckList);
    return this.http.put(this.deckListsUrl, deckList, httpOptions)
    .pipe(
      tap(_ => this.log(`updated deckList id=${deckList.id}`)),
      catchError(this.handleError<any>('updateDeckList'))
    );
  }

}
