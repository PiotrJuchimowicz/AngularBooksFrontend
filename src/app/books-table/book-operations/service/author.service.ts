import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../../model/person';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://localhost:8080/authors';

  constructor(private http: HttpClient) {
  }

  getAuthors(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.apiUrl);
  }
}
