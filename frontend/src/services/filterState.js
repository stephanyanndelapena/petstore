export function readFiltersFromUrl(search) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
}

export function writeFiltersToUrl(filters) {
  const params = new URLSearchParams(filters);
  return `?${params.toString()}`;
}
