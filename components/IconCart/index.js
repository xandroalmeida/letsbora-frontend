import Link from "next/link";
import { pathsMenu } from "../../utils/routes";
import {connect, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import { CART_DATA } from '../../redux/actions/actionTypes';
import {wrapper} from '../../redux/storeConfig';
import Cookies from 'js-cookie';
import config from '../../config';
import {cartData} from '../../redux/actions/cart';

function IconCart (props) {

   const [badgeTotalCart, setBadgeTotalCart] = useState(null);

   useEffect(()=>{
      // console.log('props.cart-icon-cart', props.cart);
      if(props.cart.cart && props.cart.cart.length > 0 && badgeTotalCart !== props.cart.cart.length)
      {
         setBadgeTotalCart(props.cart.cart.length);
      }
   }, [props.cart]);

   useEffect(()=>{
      checkCookie();
   }, []);

   function checkCookie() {
      const cartJson = Cookies.get(config.cookieCart) ? JSON.parse(Cookies.get(config.cookieCart)) : [];
      props.onCartData(cartJson);
      console.log('cartJson', cartJson);
   }

   return (
      <Link href={pathsMenu.carrinho}>
         <a className="btn-icon-cart">
            <i className="fas fa-shopping-cart"></i>
            {badgeTotalCart && badgeTotalCart > 0 && <div className="badge-cart-total">{badgeTotalCart}</div>}
         </a>
      </Link>
   );
}

const mapDispatchToProps = dispatch => {
   return {
      onCartData: objPost => dispatch(cartData(objPost))
   }
}

const mapStateToProps = ({ cart }) => {
   return {
      cart
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconCart);