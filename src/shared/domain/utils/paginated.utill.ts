export function paginatedResponse<T>(array: T[], paginated): T[] {
  const { page, take } = paginated;
  const startIndex = page * take;
  const endIndex = startIndex + take;
  return array.slice(startIndex, endIndex);
}
