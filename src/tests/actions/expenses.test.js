import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  setExpenses, 
  removeExpense, 
  startAddExpense, 
  addExpense, 
  editExpense,
  startEditExpense,
  startRemoveExpense, 
  startSetExpenses 
  } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = '0ae2584c-4cf6-4026-9da3-81a6fd37f3c1';
const defaultAuthState = {
  auth: { uid }
};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' }
  });
});

test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    description: 'Transfer money in HL account',
    amount: 100000
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      const val = snapshot.val();
      expect(val).toEqual({
        description: updates.description,
        amount: updates.amount,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
      });
      done();
    });
  });
});

test('should setup add expense actio object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDataDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDataDefault
      }
    });
    
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDataDefault);
      done();
  });
});

test('should setup setExpense action object', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});