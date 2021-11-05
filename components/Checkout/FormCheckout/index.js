import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import FormCard from "./FormCard";

import FormUserData from "./FormUserData";

function FormCheckout(props) {

   const { register, handleSubmit, errors } = useForm();

   const onSubmit = formData => {
      props.onHandleSubmitFormToGateway(formData);
      //TO-DO send form to api gateway
   }

   return (
      <div className="form-checkout template-form">
         <form id="form-checkout" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="subtitle">Detalhes de faturamento</h3>
            <FormUserData register={register} errors={errors} userDataCookie={props.userData} />
            
            {props.typePayment === 'credit_card' && <FormCard register={register} errors={errors} userDataCookie={props.userData} enableCVV={true} />}

            <input type="hidden" ref={register({required: true})} name="cart" value={JSON.stringify(props.cartData)} />
         </form>
      </div>
   );
}

export default FormCheckout;