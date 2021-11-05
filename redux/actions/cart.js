import {
   CART_DATA
} from './actionTypes'

export const cartData = cart => {
   console.log('cartData',cart);
   return {
      type: CART_DATA,
      payload: cart
   }
}