import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailComponent } from './match-detail/match-detail.component'; // <-- NgModel lives here
import { MatchService } from './match.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatToolbarModule, MatTabsModule, MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule  } from '@angular/material';
import { MatSlideToggleModule, MatSnackBarModule, MatExpansionModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatDatepickerModule,
         MatNativeDateModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule
 } from '@angular/material';

import { AppRoutingModule} from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryMatchService } from './in-memory-match.service';
import { PlayersComponent } from './players/players.component';
import { DecksComponent } from './decks/decks.component';
import { NewMatchComponent } from './new-match/new-match.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    MatchDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PlayersComponent,
    DecksComponent,
    NewMatchComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryMatchService, {
      dataEncapsulation: false
    }),
    // For material 4 https://coursetro.com/posts/code/67/Angular-4-Material-Tutorial
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    BrowserAnimationsModule,

    /*MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,*/
  ],

  providers: [MatchService, MessageService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
