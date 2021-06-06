const redux = require('redux');
const reduxLogger = require('redux-logger');

const { createStore, combineReducers, applyMiddleware } = redux;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

const buyCake = () => ({
  type: BUY_CAKE,
  info: 'You bought one cake'
});

const buyIcecream = () => ({
  type: BUY_ICECREAM,
  info: 'You bought one icecream'
});

const initialCakeState = {  numOfCakes: 10 }
const initialIcecreamState = { numOfIcecreams: 20 }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    default:
      return state;
  }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log('initial state: ', store.getState());

const unsubscribe = store.subscribe(() => {
  // the console.log below is replaced by logger middleware
  // console.log('Updated state: ', store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsubscribe();