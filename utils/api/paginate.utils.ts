export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export function paginateList<T>(
  list: T[],
  page: number,
  pageSize: number
): Paginated<T> {
  return {
    items: list,
    total: list.length,
    page,
    pageSize,
  };
}
