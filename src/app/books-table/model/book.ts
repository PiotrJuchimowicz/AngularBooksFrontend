import {Person} from './person';
import {DictionaryCategory} from './dictionary-category';

export interface Book {
  id: number;
  isbn: string;
  title: string;
  numberOfPages: number;
  releaseDate: Date;
  author: Person;
  borrower: Person;
  dictionaryCategories: DictionaryCategory[];
}
