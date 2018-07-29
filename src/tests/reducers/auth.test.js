import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const uid = '24tgdr43t3yljshhe4';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid
  });
});

test('should set the logout reducer', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything'}, action);
  expect(state).toEqual({});
});