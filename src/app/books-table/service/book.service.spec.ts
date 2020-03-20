import {async, inject, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {BookService} from './book.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('BookServiceService', () => {
  beforeEach(
    async (() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    })));

  it('should be created',
    inject([HttpClientTestingModule], () => {
      const service: BookService = TestBed.get(BookService);
      expect(service).toBeTruthy();
    }));
});
