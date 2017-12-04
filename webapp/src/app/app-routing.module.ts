import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './match/match.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { PlayersComponent } from './players/players.component';
import { DecksComponent } from './decks/decks.component';
import { NewMatchComponent } from './new-match/new-match.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'match', component: MatchComponent },
  { path: 'detail/:id', component: MatchDetailComponent },
  { path: 'decks', component: DecksComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'newmatch', component: NewMatchComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
