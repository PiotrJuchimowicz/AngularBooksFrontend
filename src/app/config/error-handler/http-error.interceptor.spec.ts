import {TestBed} from '@angular/core/testing';

import {HttpErrorInterceptor} from './http-error.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HttpErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptor
    ],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
