import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../../model/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
}
