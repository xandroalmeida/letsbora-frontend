import { useEffect, useState } from "react";
import Loading from "../../Loading";
import {sendCheckCouponApi} from '../../../api/connect_api';


function ModalCoupon({cartData, onCupomApplied, openCupomModal, onHideModal}) {

   const [checkingCupom, setCheckingCupom] = useState(null);
   const [errorCupom, setErrorCupom] = useState(null);
   const [code, setCode] = useState('');
   const [errorInput, setErrorInput] = useState(null);
   const [showCupomModal, setShowCupomModal] = useState(false);

   useEffect(()=>{
      setShowCupomModal(openCupomModal);
   }, [openCupomModal]);


   function submitCode() {
      setErrorInput(null);
      if(!code)
      {
         setErrorInput(1);
      }

      sendCheckCoupon();
   }

   function onChange(value) {
      if(!value.trim())
      {
         setErrorInput(1);
      }
      else
      {
         setErrorInput(null);
         setCode(value.trim());
      }
   }

   async function sendCheckCoupon()
   {
      setCheckingCupom(true);
      const objPost = {
         code,
         cartData
      };
      const respCoupon = await sendCheckCouponApi(objPost);
      if(respCoupon.data && respCoupon.data.error === 1)
      {
         setErrorCupom(respCoupon.data.message);
         setCheckingCupom(false);
         return;
      }

      onCupomApplied(respCoupon.data.cupom);
      setCheckingCupom(false);
      onHideModal();
   }

   return (
      <section className={`modal-coupon ${showCupomModal ? 'open':''}`}>
         <div className="box-coupon">
            <div className="btn-close">
               <img onClick={()=>onHideModal()} src="/assets/imgs/icons/icon_close.svg" width={30} alt="Fechar"/>
            </div>
            <h3>Digite o código do cupom abaixo:</h3>
            <input type="text" 
               placeholder="digite o código do cupom"
               value={code}
               onChange={(e)=>onChange(e.target.value)}
               className={errorInput ? 'input-error':''}
            />
            {checkingCupom && <Loading width={60} />}
            {!checkingCupom && <button onClick={()=>submitCode()} type="submit">Verificar cupom</button>}
            {errorCupom && <div className="error-block">{errorCupom}</div>}
         </div>
         <div onClick={()=>onHideModal()} className="overlay"></div>
      </section>
   );
}

export default ModalCoupon;