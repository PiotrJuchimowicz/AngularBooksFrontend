import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DictionaryCategory} from '../../model/dictionary-category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryCategoryService {
  private apiUrl = 'http://localhost:8080/dictionary-categories';

  constructor(private http: HttpClient) {
  }

  getDictionaries(): Observable<DictionaryCategory[]> {
    return this.http.get<DictionaryCategory[]>(this.apiUrl);
  }
}
