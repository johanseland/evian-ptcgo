import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatchDetailComponent } from './match-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatchService } from '../match.service';
import { MessageService } from '../message.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteStub } from '../testing/router-stubs';

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;
  let activatedRoute = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [MatchService, MessageService]
    })
    .compileComponents();

    activatedRoute.testParamMap = { id: 99 };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
