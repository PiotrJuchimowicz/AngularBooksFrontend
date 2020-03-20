import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookList} from '../model/book-list';
import {BookSave} from '../book-operations/model/book-save';
import {Book} from '../model/book';
import {BookBorrow} from '../book-operations/model/book-borrow';
import {GetBooks} from '../model/get-books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/books';

  constructor(private http: HttpClient) {
  }

  saveBook(book: BookSave): Observable<void> {
    return this.http.post<void>(this.apiUrl, book);
  }

  getBooks(request: GetBooks): Observable<BookList> {
    return this.http.post<BookList>(this.apiUrl + '/find', request);
  }

  deleteBook(id: number): Observable<any> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete(url);
  }

  getBook(id: number): Observable<Book> {
    const url = this.apiUrl + '/' + id;
    return this.http.get<Book>(url);
  }

  borrowBook(bookBorrow: BookBorrow): Observable<void> {
    const url = this.apiUrl + '/borrow';
    return this.http.post<void>(url, bookBorrow);
  }
}
