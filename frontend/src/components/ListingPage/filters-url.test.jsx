import { readFiltersFromUrl, writeFiltersToUrl } from '../../services/filterState';

test('read/write filters to url', () => {
  const params = '?species=dogs&min_price=100';
  const filters = readFiltersFromUrl(params);
  expect(filters.species).toBe('dogs');
});
