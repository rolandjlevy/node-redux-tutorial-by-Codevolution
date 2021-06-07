const redux = require('redux');
const thunk = require('redux-thunk');
const { createStore } = redux;

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FESTCH_USERS_REQUEST = 'FESTCH_USERS_REQUEST';
const FESTCH_USERS_SUCCESS = 'FESTCH_USERS_SUCCESS';
const FESTCH_USERS_FAILURE = 'FESTCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FESTCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FESTCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FESTCH_USERS_FAILURE,
    payload: error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FESTCH_USERS_REQUEST:
      ...state,
      loading: true
    case: FESTCH_USERS_SUCCESS:
      loading: false,
      users: action.payload,
      error: ''
    case: FESTCH_USERS_FAILURE:
      loading: false,
      users: [],
      error: action.payload
    default:
      state
  }
}

const store = createStore(reducer);