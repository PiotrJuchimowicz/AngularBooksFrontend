import {Pipe, PipeTransform} from '@angular/core';
import {DictionaryCategory} from './model/dictionary-category';

@Pipe({
  name: 'sortDictionaryCategories'
})
export class SortDictionaryCategoriesPipe implements PipeTransform {

  transform(dictionaryCategories: DictionaryCategory[]): DictionaryCategory[] {

    return dictionaryCategories.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
      return 0;
    });
  }

}
