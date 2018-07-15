import filtersReducer from '../../reducers/filters';
import moment from 'moment';

const defaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    ...defaultState
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('should set startDate', () => {
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: 1000 });
  expect(state.startDate).toBe(1000);
});

test('should set endDate', () => {
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: 3000 });
  expect(state.endDate).toBe(3000);
});

test('should set text filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'Some new change' });
  expect(state.text).toBe('Some new change');
});