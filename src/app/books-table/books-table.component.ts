import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from './service/book.service';
import {Book} from './model/book';
import {BookAddComponent} from './book-operations/book-save/book-save.component';
import {Router} from '@angular/router';
import {GetBooks} from './model/get-books';
import {LazyLoadEvent} from 'primeng';
import {Filter} from './table-filter/filter';
import {TableFilterComponent} from './table-filter/table-filter.component';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  books: Book[] = [];
  columns: any[];
  selectedBook: Book = null;
  @ViewChild(BookAddComponent) bookAddChild: BookAddComponent;
  @ViewChild(TableFilterComponent) tableFilterChild: TableFilterComponent;

  totalCount: number;
  pageNumber = 0;
  pageSize = 9;
  sortColumn = 'numberOfPages';
  sortOrder = 'ASC';
  loading: boolean;


  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    this.setTableColumns();
  }

  showAddDialog() {
    this.bookAddChild.showAddDialog();
  }

  showEditDialog() {
    this.bookAddChild.book = this.selectedBook;
    this.bookAddChild.showEditDialog();
  }

  deleteSelected(): void {
    if (this.selectedBook == null) {
      return;
    }

    this.bookService.deleteBook(this.selectedBook.id).subscribe(() => {
      this.readBooks();
      this.selectedBook = null;
    });

  }

  selectBook(book): void {
    this.selectedBook = book;
  }

  navigateToBookDetails(): void {
    this.router.navigate(['/book-details'], {queryParams: {bookId: this.selectedBook.id}});
  }

  onSave(): void {
    this.readBooks();
  }

  loadDataLazy(event: LazyLoadEvent): void {
    this.loading = true;
    this.pageNumber = this.countPageNumber(event);
    this.sortColumn = event.sortField;
    this.sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.resetFilterInputs();
    this.readBooks();
  }

  displayFilteredBooks(filter: Filter[]) {
    this.readBooks(filter);
  }

  clearFilters() {
    this.readBooks();
  }

  private setTableColumns(): void {
    this.columns = [
      {field: 'isbn', header: 'ISBN'},
      {field: 'title', header: 'Title'},
      {field: 'numberOfPages', header: 'Number of pages'},
      {field: 'releaseDate', header: 'Release date'},
      {field: 'author', header: 'Author'},
      {field: 'borrower', header: 'Borrower'},
      {field: 'dictionaryCategories', header: 'Dictionary categories'}
    ];
  }

  private readBooks(filter?: Filter[]): void {
    const request = this.getBooksRequest();
    this.bookService.getBooks(request).subscribe(data => {
      if (filter !== undefined && filter.length !== 0) {
        this.books = this.applyFilter(data.books, filter);
      } else {
        this.books = data.books;
      }
      this.totalCount = data.totalCount;
      this.loading = false;
    });
  }

  private getBooksRequest(): GetBooks {
    return {
      pagination: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      sorting: {
        column: this.sortColumn,
        order: this.sortOrder
      }
    };
  }

  private countPageNumber(event: LazyLoadEvent): number {
    const beforeSortBy = this.sortColumn;
    return (beforeSortBy === event.sortField) ? (event.first / this.pageSize) : 0;
  }

  private applyFilter(books: Book[], filters: Filter[]): Book[] {
    return books.filter(book => {
      let meetsRequirements = true;
      for (const filter of filters) {
        meetsRequirements = this.doesBookMeetFilterRequirements(book, filter);
        if (meetsRequirements === false) {
          return false;
        }
      }
      return meetsRequirements;
    });
  }

  private resetFilterInputs(): void {
    if (this.tableFilterChild !== undefined) {
      this.tableFilterChild.clearFilterInputs();
    }
  }

  private doesBookMeetFilterRequirements(book: Book, filter: Filter): boolean {
    const property = filter.property;
    switch (property) {
      case 'authors': {
        if (book.author === null || book.author === undefined) {
          return false;
        } else {
          return filter.value.map(data => data.id).includes(book.author.id);
        }
      }
      case  'borrowers': {
        if (book.borrower !== null && book.borrower !== undefined) {
          return filter.value.filter(data => data.id !== undefined).map(data => data.id).includes(book.borrower.id);
        } else {
          return filter.value.includes('');
        }
      }


      case  'dictionaryCategories': {
        if (book.author === null || book.author === undefined) {
          return false;
        } else {
          return filter.value.map(data => data.id).includes(book.dictionaryCategories.map(dictinaryCategory => dictinaryCategory.id));
        }
      }

      case 'numberOfPages' : {
        return book.numberOfPages > filter.value;

      }

      case 'releaseDate': {
        const releaseYear = (book.releaseDate as unknown as string).substring(6);
        return releaseYear > filter.value;
      }

      case 'isbn' : {
        return book[filter.property].toLowerCase().includes(filter.value.toLowerCase());
      }

      case 'title': {
        return book[filter.property].toLowerCase().includes(filter.value.toLowerCase());
      }

      default : {
        return true;
      }
    }
  }
}
