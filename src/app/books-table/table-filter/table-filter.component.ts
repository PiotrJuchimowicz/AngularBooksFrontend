import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng';
import {AuthorService} from '../book-operations/service/author.service';
import {UserService} from '../book-operations/service/user.service';
import {DictionaryCategoryService} from '../book-operations/service/dictionary-category.service';
import {DictionaryCategory} from '../model/dictionary-category';
import {Filter} from './filter';
import {Person} from '../model/person';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {

  @Output() filterBooksEvent = new EventEmitter<Filter[]>();
  @Output() clearFilterEvent = new EventEmitter<void>();

  isbnFilter: string = null;
  titleFilter: string = null;
  numberOfPagesFilter = null;
  releaseDateFilter = null;
  authorsFilter: Person[] = null;
  borrowersFilter: Person[] = null;
  dictionaryCategoriesFilter: DictionaryCategory[] = null;

  authors: SelectItem[];
  users: SelectItem[];
  dictionaryCategories: DictionaryCategory[];

  constructor(private authorService: AuthorService, private userService: UserService,
              private dictionaryCategoryService: DictionaryCategoryService) {
  }


  ngOnInit(): void {
    this.setAuthors();
    this.setUsers();
    this.setDictionaryCategories();
  }


  filterButtonClicked(): void {
    this.filterBooksEvent.emit(this.getFilter());
  }

  clearFilterClicked(): void {
    this.clearFilterInputs();
    this.clearFilterEvent.emit();
  }

  clearFilterInputs(): void {
    this.isbnFilter = null;
    this.titleFilter = null;
    this.numberOfPagesFilter = null;
    this.releaseDateFilter = null;
    this.authorsFilter = null;
    this.borrowersFilter = null;
    this.dictionaryCategoriesFilter = null;
  }

  private setAuthors(): void {
    this.authorService.getAuthors().subscribe(data => {
        this.authors = data.map(author => ({label: author.name + ' ' + author.surname, value: author}));
      }
    );
  }

  private setUsers(): void {
    this.userService.getUsers().subscribe(data => {
        this.users = data.map(user => ({label: user.name + ' ' + user.surname, value: user}));
        this.users.push({label: '-', value: ''});
      }
    );
  }

  private setDictionaryCategories(): void {
    this.dictionaryCategoryService.getDictionaries().subscribe(data => this.dictionaryCategories = data);
  }

  private getFilter(): Filter [] {
    const filter = [];
    if (this.isbnFilter !== null && this.isbnFilter !== '') {
      filter.push({property: 'isbn', value: this.isbnFilter});
    }

    if (this.titleFilter !== null && this.titleFilter !== '') {
      filter.push({property: 'title', value: this.titleFilter});
    }

    if (this.numberOfPagesFilter !== null && this.numberOfPagesFilter !== '') {
      filter.push({property: 'numberOfPages', value: this.numberOfPagesFilter});
    }

    if (this.releaseDateFilter !== null && this.releaseDateFilter !== '') {
      filter.push({property: 'releaseDate', value: this.releaseDateFilter});
    }

    if (this.authorsFilter !== null && this.authorsFilter.length > 0) {
      filter.push({property: 'authors', value: this.authorsFilter});
    }

    if (this.borrowersFilter !== null && this.borrowersFilter.length > 0) {
      filter.push({property: 'borrowers', value: this.borrowersFilter});
    }

    if (this.dictionaryCategoriesFilter !== null && this.dictionaryCategoriesFilter.length > 0) {
      filter.push({property: 'dictionaryCategories', value: this.dictionaryCategoriesFilter});
    }

    return filter;
  }
}
