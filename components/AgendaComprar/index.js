import cookie from 'js-cookie';
import Router from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import config from '../../config';
import { cartData } from '../../redux/actions/cart';
import { pathsMenu } from "../../utils/routes";
import { currencyFormat } from "../../utils/utils";
import Calendario from "../Calendario";
import ImageContainer from "../ImageContainer";

function AgendaComprar(props) {

   const { expInfoData, priceData } = props;

   const priceAdult = expInfoData.priceDefaultAdult;
   const priceKids = expInfoData.priceDefaultKids;

   const [firstKey] = Object.keys(priceData)

   const [totalAdults, setTotalAdults] = useState(firstKey);
   const [totalKids, setTotalKids] = useState(0);
   const [total, setTotal] = useState(priceAdult);
   const [selectedDay, setSelectedDay] = useState(null);
   const [errorDataNotSelected, setErrorDataNotSelected] = useState(false);

   useEffect(() => {
      calculateTotal();
   }, [totalAdults, totalKids])

   function changeTotal(type, action) {
      if (type === 'adults') {
         let newAdults = totalAdults;
         console.log('priceData.length', priceData.length);
         if (action === 'minus') {
            newAdults--;

            if (newAdults < firstKey) newAdults = firstKey;
         }
         else {
            newAdults++;
            if (newAdults > Object.keys(priceData).length) newAdults = Object.keys(priceData).length;
         }
         console.log('newAdults', newAdults);
         setTotalAdults(newAdults);
      } else {
         let newKids = totalKids;
         if (action === 'minus') {
            newKids--;
            if (newKids < 0) newKids = 0
         }
         else {
            newKids++;
            if (newKids > 4) newKids = 4
         }
         setTotalKids(newKids);
      }
   }

   function calculateTotal() {
      console.log('totalAdults', totalAdults);
      console.log('expInfoData', expInfoData);
      console.log('priceData', priceData);

      const subtotalAdults = priceData[totalAdults] ? priceData[totalAdults].price : (expInfoData.priceDefaultAdult * totalAdults); // se nao foi cadastrada a quantidade certa dos adultos, eu pego o preço por adulto padrão e multiplico pela quantidade de adultos
      const subtotalKids = totalKids * priceKids;
      const totalToShow = subtotalAdults + subtotalKids;

      setTotal(totalToShow);
   }

   /* action = 0 = permanece na página e adiciona o produto ao carrinho
   *  action = 1 = adiciona produto ao carrinho e redireciona automaticamente para o checkout
   */
   function addToCart(action) {
      if (selectedDay) {
         const objAddToCart = {
            idexperiencias: expInfoData.idexperiencias,
            name: expInfoData.name,
            totalAdults,
            totalKids,
            total,
            selectedDay
         };

         console.log('props.cart', props.cart);
         const newCart = [...props.cart];
         newCart.push(objAddToCart);

         console.log('newCart', newCart);

         props.onCartData(newCart);
         cookie.set(config.cookieCart, JSON.stringify(newCart), { expires: 90 });

         if (action) {
            Router.push({
               pathname: pathsMenu.checkout
            })
         }
         else {
            props.onAddedToCart();
         }
      }
      else {
         setErrorDataNotSelected(true);
      }
   }

   return (
      <div className="wrap-content-calendar">
         <div className="gallery-imgs-exp-others">
            <div className="container-agendamento">
               <div className="header-agendamento">
                  <h3>Agenda</h3>
                  <div className="icon-fechar" onClick={() => props.onCloseAgenda()}>
                     <Image src="/assets/imgs/icon_fechar_agenda.svg" width="26" height="1" />
                  </div>
               </div>
               <div className="body-agendamento">
                  <div className="quantidade">
                     <div className="box-quantidade">
                        <div className="bx-qty">
                           <div onClick={() => changeTotal('adults', 'minus')}>-</div>
                           <div className="input">
                              {totalAdults}
                           </div>
                           <div onClick={() => changeTotal('adults', 'plus')}>+</div>
                        </div>
                        <span>adultos</span>
                     </div>
                     <div className="box-quantidade">
                        <div className="bx-qty">
                           <div onClick={() => changeTotal('kids', 'minus')}>-</div>
                           <div className="input">
                              {totalKids}
                           </div>
                           <div onClick={() => changeTotal('kids', 'plus')}>+</div>
                        </div>
                        <span>crianças</span>
                     </div>
                  </div>
                  <div className="container-calendario">
                     <Calendario weekDays={expInfoData.weekdays} idExp={expInfoData.idexperiencias} onSetSelectedDay={(value) => setSelectedDay(value)} />
                  </div>
                  <div className="container-total">
                     <span className="total-price">
                        {currencyFormat(total)}
                     </span>

                     <span className="qty-compras">{totalAdults} adultos e {totalKids} crianças</span>
                     {selectedDay && <span className="dia-escolhido">Dia escolhido: {selectedDay.toLocaleDateString()}</span>}

                     <a className={`add-cart ${selectedDay ? '' : 'disabled'}`} onClick={() => addToCart(0)}>adicionar ao carrinho</a>


                     <a className={`btn-checkout ${selectedDay ? '' : 'disabled'}`} onClick={() => addToCart(1)}>fechar a compra</a>
                     {errorDataNotSelected && !selectedDay && <span className="error-message">Selecione uma data para continuar</span>}

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

const mapDispatchToProps = dispatch => {
   return {
      onCartData: objPost => dispatch(cartData(objPost))
   }
}

const mapStateToProps = ({ cart }) => {
   return {
      cart: cart.cart
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaComprar);