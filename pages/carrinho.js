import cookie from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import config from '../config';
import PageInterna1 from '../layouts/PageInterna1';
import { cartData } from '../redux/actions/cart';
import { pathsMenu } from '../utils/routes';
import { currencyFormat } from '../utils/utils';

function Carrinho(props) {

   const [cartData, setCartData] = useState([]);
   const [totalCheckout, setTotalCheckout] = useState(0);

   // console.log('props.initialCartValue', props.initialCartValue);

   useEffect(() => {
      calculateTotalCheckout();
   }, [cartData])

   useEffect(() => {
      setCartData(props.cart.cart);
      if(props.cart.cart && props.cart.cart.length > 0)
      {
         calculateTotalCheckout();
      }
   }, [props.cart])

   useEffect(() => {
      props.onCartData(props.initialCartValue);
   }, [props.initialCartValue]);

   function deleteItem(index) {
      const newCart = [...cartData];
      newCart.splice(index, 1);

      props.onCartData(newCart);
      cookie.set(config.cookieCart, JSON.stringify(newCart), { expires: 90 });
      calculateTotalCheckout();
   }

   function calculateTotalCheckout() {
      let totalCheckout = 0;

      for (let index = 0; index < cartData.length; index++) {
         const element = cartData[index];
         totalCheckout = totalCheckout + element.total;         
      }

      setTotalCheckout(totalCheckout);
   }

   return (
      <PageInterna1>
         <section className="carrinho section section-gray">
            <div className="container">
               <h2 className="title text-center">Meu Carrinho</h2>
               {(!cartData || cartData.length === 0) && <>
                  <h3 className="warning-empty-cart">Seu carrinho está vazio.</h3>
                  <div className="actions-cart flex-center">
                     <Link href={pathsMenu.experiencias}>
                        <a className="back">voltar para experiências</a>
                     </Link>
                  </div>
               </>}

               {cartData && cartData.length > 0 && cartData.map((item, index) => {
                  console.log('item', item);
                  return (
                     <div key={`item-cart-${item.idexperiencias}-${index}`} className="row-item">
                        <div className="col-left">
                           <h3>{item.name}</h3>
                           <p>Data escolhida: <strong>{new Date(item.selectedDay).toLocaleDateString()}</strong></p>
                        </div>
                        <div className="col-right">
                           <div className="sub-total">{currencyFormat(item.total)}</div>
                           <div className="parcelamento">{item.totalAdults} Adulto(s) {item.totalKids > 0 ? `e ${item.totalKids} crianca(s)` : ''}</div>
                        </div>
                        <a onClick={(index) => deleteItem(index)} className="delete-item-cart" title="Remover item"><i className="fas fa-trash-alt"></i></a>
                     </div>
                  );
               })}

               {cartData && cartData.length > 0 &&<div className="box-total">
                  Total
                  <span>{currencyFormat(totalCheckout)}</span>
               </div>}

               {cartData && cartData.length > 0 && <div className="actions-cart">
                  <Link href={pathsMenu.experiencias}>
                     <a className="back">voltar para experiências</a>
                  </Link>
                  <Link href={pathsMenu.checkout}>
                     <a className="endup">finalizar a compra</a>
                  </Link>
               </div>}

            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const cartJson = req.cookies.letsboracart ? JSON.parse(req.cookies.letsboracart) : [];
   return {
      props: {
         initialCartValue: cartJson
      }
   }
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

export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);