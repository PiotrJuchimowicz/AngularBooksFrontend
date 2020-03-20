export interface GetBooks {
  pagination: Pagination;
  sorting: Sorting;
}

interface Pagination {
  pageNumber: number;
  pageSize: number;
}

interface Sorting {
  column: string;
  order: string;
}
