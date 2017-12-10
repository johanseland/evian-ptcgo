import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatchDetailComponent } from './match-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatchService } from '../match.service';
import { MessageService } from '../message.service';
import { HttpClientModule } from '@angular/common/http';

import {
  ActivatedRoute, ActivatedRouteStub, Router, RouterStub
} from '../testing/router-stubs';

// https://github.com/angular/angular/blob/master/aio/content/examples/testing/src/app/hero/hero-detail.component.spec.ts
let activatedRoute: ActivatedRouteStub;

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { id: 11 };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [
        MatchService, MessageService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
});
