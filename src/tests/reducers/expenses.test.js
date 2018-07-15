import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should add a new expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      description: 'Rent',
      amount: 1000,
      note: 'Pay rent',
      createdAt: 100000
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
      ...expenses,
      action.expense
  ]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit an expense by id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'Buy toilet paper'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe(action.updates.description);
});

test('should not edit an expense if id is not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-2',
    updates: {
      description: 'Buy toilet paper'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});