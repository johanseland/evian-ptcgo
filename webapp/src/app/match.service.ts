import { Injectable } from '@angular/core';
import { Match, Player } from './types';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class MatchService {
  private matchUrl = 'api/matches'; // URL to web api
  private playersUrl = 'api/players';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMatches(): Observable<Match[]> {
    // this.messageService.add('MatchService: fetched matches');
    // return of(MATCHES);
    // return this.http.get<Match[]>(this.matchUrl);
    return this.http.get<Match[]>(this.matchUrl)
      .pipe(
        tap(heroes => this.log(`fetched matches`)),
        catchError(this.handleError('getMatches', []))
      );
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
    .pipe(
      tap(x => this.log(`fetched players`)),
      catchError(this.handleError('getPlayers', []))
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

  /** PUT: update the hero on the server */
  updateMatch (match: Match): Observable<any> {
    console.log(match);
  return this.http.put(this.matchUrl, match, httpOptions).pipe(
    tap(_ => this.log(`updated match id=${match.id}`)),
    catchError(this.handleError<any>('updateMatch'))
    );
  }


}
