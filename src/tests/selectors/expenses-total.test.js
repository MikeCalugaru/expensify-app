import expenses from '../fixtures/expenses';
import getTotalExpenses from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
  const total = getTotalExpenses([]);
  expect(total).toBe(0);
});

test('should correctly add up a sigle expense', () => {
  const total = getTotalExpenses([expenses[0]]);
  expect(total).toBe(195);
});

test('should correctly add up multiple expenses', () => {
  const total = getTotalExpenses(expenses);
  expect(total).toBe(114195);
});
