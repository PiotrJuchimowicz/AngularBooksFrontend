import {async, inject, TestBed} from '@angular/core/testing';

import {AuthorService} from './author.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthorService', () => {
  beforeEach(
    async (() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })));

  it('should be created',
    inject([HttpClientModule]
      , () => {
        const service: AuthorService = TestBed.get(AuthorService);
        expect(service).toBeTruthy();
      }));
});
