import { useState } from "react";
import { currencyFormat, formatDate } from "../../../utils/utils";

function AccordionPedidos(props) {

   const [open, setOpen] = useState(false);

   // console.log('props', props);
   const [cart, setCart] = useState(props ? JSON.parse(props.item.cart):null);
   // console.log('cart', cart);

   return (
      <div onClick={()=>setOpen(!open)} className={`panel-pedido ${open ? 'open':''} `}>
         <div className="header-pedido">
            <div>
               <h3>Pedido nº - {props.item.protocol}</h3>
               <div className="data-pedido">Realizado em: {formatDate(props.item.createdAt)}</div>
            </div>
            <div>
               {open ? <i className="fas fa-minus-square"></i>:<i className="fas fa-plus-square"></i>}
            </div>
         </div>
         <div className="body-pedido">
            <h4>Itens do pedidos</h4>

            {cart.map(item=>{
               return (
                  <div className="row-pedidos">
                     <div className="col-left">
                        <h3>{item.name}</h3>
                        <p>Data escolhida: {formatDate(item.selectedDay)}</p>
                     </div>
                     <div className="col-right">
                        <div className="sub-total">{currencyFormat(item.total)}</div>
                        <div className="parcelamento">{item.totalAdults} Adulto(s)<br/>{item.totalKids > 0 ? `${item.totalKids} crianca(s)` : ''}</div>
                     </div>
                  </div>
               );
            })}

            {props.item.couponsIdcoupon && <div className="box-cupom">
               Cupom utilizado
               <span>{props.item.couponsIdcoupon.type === 'fixed' ? currencyFormat(props.item.couponsIdcoupon.value):props.item.couponsIdcoupon.value+'%'}</span>
            </div>}

            <div className="box-total">
               Total
               <span>{currencyFormat(props.item.value)}</span>
            </div>
         </div>
      </div>
   );
}

export default AccordionPedidos;