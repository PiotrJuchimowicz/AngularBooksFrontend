import {async, inject, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

import {UserService} from './user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserService', () => {
  beforeEach(
    async (() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule]
      })));

  it('should be created', () => {
      const service: UserService = TestBed.get(UserService);
      expect(service).toBeTruthy();
    });
});
