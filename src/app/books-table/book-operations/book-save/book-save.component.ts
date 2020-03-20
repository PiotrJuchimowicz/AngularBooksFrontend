import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookService} from '../../service/book.service';
import {DictionaryCategory} from '../../model/dictionary-category';
import {AuthorService} from '../service/author.service';
import {UserService} from '../service/user.service';
import {DictionaryCategoryService} from '../service/dictionary-category.service';
import {SelectItem} from 'primeng';
import * as moment from 'moment';
import {BookSave} from '../model/book-save';
import {Person} from '../../model/person';
import {Book} from '../../model/book';

@Component({
  selector: 'app-book-save',
  templateUrl: './book-save.component.html',
  styleUrls: ['./book-save.component.css']
})
export class BookAddComponent implements OnInit {

  display = false;

  authors: SelectItem[];
  dictionaryCategories: DictionaryCategory[];

  idInput: number = null;
  isbnInput: string = null;
  titleInput: string = null;
  releaseDateInput: Date = null;
  numberOfPagesInput: number = null;
  authorInput: Person = null;
  dictionaryCategoriesInput: DictionaryCategory[] = null;


  @Output() bookSavedEvent = new EventEmitter<void>();
  @Input() book: Book;


  constructor(private bookService: BookService, private authorService: AuthorService,
              private userService: UserService, private dictionaryCategoryService: DictionaryCategoryService) {
  }

  ngOnInit(): void {
    this.setAuthors();
    this.setDictionaryCategories();
  }

  saveBook(): void {
    const bookToSave = this.prepareBookToSave();
    this.bookService.saveBook(bookToSave).subscribe(() => this.bookSavedEvent.emit());
    this.hideDialog();
  }

  showAddDialog(): void {
    this.display = true;
  }

  showEditDialog(): void {
    this.fillInputs();
    this.display = true;
  }

  hideDialog(): void {
    this.clearInputs();
    this.display = false;
  }

  notAllFieldsProvided() {
    return this.isbnInput == null || this.titleInput == null || this.releaseDateInput == null ||
      this.numberOfPagesInput == null || this.numberOfPagesInput <= 0 || this.authorInput == null || this.dictionaryCategoriesInput == null;
  }

  private setAuthors(): void {
    this.authorService.getAuthors().subscribe(data => {
        this.authors = data.map(author => ({label: author.name + ' ' + author.surname, value: author}));
      }
    );
  }

  private setDictionaryCategories(): void {
    this.dictionaryCategoryService.getDictionaries().subscribe(data => {
        this.dictionaryCategories = data;
      }
    );
  }

  private prepareBookToSave(): BookSave {
    return {
      id: this.idInput,
      isbn: this.isbnInput,
      title: this.titleInput,
      numberOfPages: this.numberOfPagesInput,
      releaseDate: moment(this.releaseDateInput, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      authorId: this.authorInput.id,
      dictionaryCategoryIds: this.dictionaryCategoriesInput.map(dictionary => dictionary.id)
    };
  }

  private fillInputs(): void {
    this.idInput = this.book.id;
    this.isbnInput = this.book.isbn;
    this.titleInput = this.book.title;
    this.numberOfPagesInput = this.book.numberOfPages;
    this.releaseDateInput = this.book.releaseDate;
    this.authorInput = this.book.author;
    this.dictionaryCategoriesInput = this.book.dictionaryCategories;
  }

  private clearInputs() {
    this.idInput = null;
    this.isbnInput = null;
    this.titleInput = null;
    this.numberOfPagesInput = null;
    this.releaseDateInput = null;
    this.authorInput = null;
    this.dictionaryCategoriesInput = [];
  }
}
