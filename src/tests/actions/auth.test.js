import { login, logout } from '../../actions/auth';

test('should generate the login action correctly', () => {
  const uid = '234dfgo34t0dfndf03t';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should generate the logout action correctly', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});


