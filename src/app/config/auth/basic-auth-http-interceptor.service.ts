import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'api';
    const password = 'api';

    const customReq = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa(username + ':' + password))
    });

    return next.handle(customReq);
  }
}
