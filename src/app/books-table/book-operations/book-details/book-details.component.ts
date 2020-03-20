import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/book';
import {UserService} from '../service/user.service';
import {BookBorrow} from '../model/book-borrow';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  users: SelectItem[];
  borrowerInput: any;
  displayBookDetails = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getBookDetails(params.bookId);
    });
    this.setUsers();
  }

  borrowBook(): void {
    const bookBorrowRequestBody = this.prepareBookBorrowRequestBody();
    this.bookService.borrowBook(bookBorrowRequestBody).subscribe(() => this.router.navigateByUrl('/'));
  }

  private setUsers(): void {
    this.userService.getUsers().subscribe(data => {
        this.users = data.map(user => ({label: user.name + ' ' + user.surname, value: user}));
        this.users.push({label: 'Return book', value: ' '});
      }
    );
  }

  private prepareBookBorrowRequestBody(): BookBorrow {
    return {
      bookId: this.book.id,
      borrowerId: this.borrowerInput != null ? this.borrowerInput.id : null
    };
  }

  private getBookDetails(bookId: number) {
    this.bookService.getBook(bookId).subscribe(book => {
      this.book = book;
      this.displayBookDetails = true;
    });
  }
}
