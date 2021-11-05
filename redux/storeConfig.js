import { createStore, combineReducers, applyMiddleware } from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

import cartReducer from './reducers/cart';

const bindMiddleware = (middleware) => {
   if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
   }
   return applyMiddleware(...middleware)
}

const reducers = combineReducers({
   cart: cartReducer,
});

const reducer = (state, action) => {
   if (action.type === HYDRATE) {
      const nextState = {
         ...state, // use previous state
         ...action.payload, // apply delta from hydration
      }

      console.log('state', state);
      if (state.count && state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
      return nextState
   } else {
      return reducers(state, action)
   }
}


// create a makeStore function
const makeStore = context => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});