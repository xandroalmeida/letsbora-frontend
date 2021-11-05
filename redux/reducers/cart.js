import {
   CART_DATA
} from '../actions/actionTypes';

const initialState = {
   cart: []
}

const reducer = (state = initialState, action) => {
   // console.log('passou', action);
   switch (action.type) {
      case CART_DATA:
         console.log('action.payload.cart - cartjs - 12 -', action.payload, typeof action.payload);
         return {
            ...state,
            cart: action.payload
         }

      default:
         return state
   }
}

export default reducer;