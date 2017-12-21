import { TestBed, inject } from '@angular/core/testing';

import { UserLoginService } from './login-service.service';

describe('LoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoginService]
    });
  });

  it('should be created', inject([UserLoginService], (service: UserLoginService) => {
    expect(service).toBeTruthy();
  }));
});
