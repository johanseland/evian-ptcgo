import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatchService } from './match.service';
import { MessageService } from './message.service';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchService, MessageService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
