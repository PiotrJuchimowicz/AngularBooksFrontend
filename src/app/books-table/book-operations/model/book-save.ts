export interface BookSave {
  id?: number;
  isbn: string;
  title: string;
  numberOfPages: number;
  releaseDate: string;
  authorId: number;
  dictionaryCategoryIds: number[];
}
