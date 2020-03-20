import {async, inject, TestBed} from '@angular/core/testing';

import {DictionaryCategoryService} from './dictionary-category.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('DictionaryCategoryService', () => {
  beforeEach(
    async (() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    })));

  it('should be created',
    inject([HttpClientModule], () => {
    const service: DictionaryCategoryService = TestBed.get(DictionaryCategoryService);
    expect(service).toBeTruthy();
  }));
});
