import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from './match.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MatTableModule } from '@angular/material/table';

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CommonModule,
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
