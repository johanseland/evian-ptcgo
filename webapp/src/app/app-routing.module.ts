import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './match/match.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { PlayersComponent } from './players/players.component';
import { DecksComponent } from './decks/decks.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'match', component: MatchComponent },
  { path: 'detail/:id', component: MatchDetailComponent },
  { path: 'decks', component: DecksComponent },
  { path: 'decks/:id', component: DeckDetailComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'newmatch', component: NewMatchComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'confirm/:email', component: ConfirmComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
