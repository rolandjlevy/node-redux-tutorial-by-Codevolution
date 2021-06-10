const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const reduxLogger = require('redux-logger');

const { createStore, applyMiddleware } = redux;
const logger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
          ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return state
  }
}

const fetchUsers = () => {
  // thunk middleware allows Redux to return a function instead of an action object. Doesn't have to be pure. It receives the dispatch method as its parameteer
  const url = 'https://jsonplaceholder.typicode.com/users';
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios.get(url)
      .then(res => {
        const users = res.data.map(user => user.id)
        dispatch(fetchUsersSuccess(users));
      })
      .catch(err => {
        dispatch(fetchUsersFailure(err.message));
      });
  }
}

const store = createStore(
  reducer, 
  applyMiddleware(thunkMiddleware)
);

console.log('initial state: ', store.getState());

// store.dispatch(fetchUsersSuccess(['bob', 'tim', 'ana']));
// store.dispatch(fetchUsersFailure('Could not load'));

store.subscribe(() => {
  console.log('Current state: ', store.getState());
});

store.dispatch(fetchUsers());