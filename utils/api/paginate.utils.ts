export type Paginated<T> = {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function paginateList<T>(
  list: T[],
  page: number,
  pageSize: number,
  total: number
): Paginated<T> {
  const totalPages = Math.ceil(total / pageSize);
  return {
    items: list,
    totalItems: total,
    page,
    pageSize,
    totalPages,
  };
}
