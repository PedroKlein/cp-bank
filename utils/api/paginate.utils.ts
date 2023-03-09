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
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: list.slice(startIndex, endIndex),
    total: list.length,
    page,
    pageSize,
  };
}
