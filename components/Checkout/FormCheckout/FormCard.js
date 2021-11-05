import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Loading from '../../Loading';
import { getUserCardData } from '../../../api/connect_api';

const FormCard = ({ register, errors, userDataCookie, enableCVV }) => {

   const [userData, setUserData] = useState(userDataCookie ? userDataCookie : null);

   const [cardNumber, setCardNumber] = useState('');
   const [name_card, setNameCard] = useState('');
   const [valid, setValid] = useState('');

   const [loading, setLoading] = useState(null);
   const [alreadyLoadInfo, setAlreadyLoadInfo] = useState(false);

   useEffect(() => {
      console.log('userData', userData);
      if (userData) {
         if (alreadyLoadInfo === false) {
            fetchUserDataInfo();
            setAlreadyLoadInfo(true);
         }

         if(userData.data)
         {
            const data = userData.data;

            if(data.numberCard) setCardNumber(data.numberCard)

            if(data.cardName) setNameCard(data.cardName)

            if(data.expirationDate) setValid(data.expirationDate)
         }
      }
   }, [userData]);

   async function fetchUserDataInfo() {
      setLoading(true);
      console.log('userData.id', userData.id);
      const userInfo = await getUserCardData(userData.id);
      setUserData(userInfo);
      setLoading(false);
   }

   return (
      <>
         {loading && <Loading lighter={1} width={60} />}
         {!enableCVV && <input type="hidden" ref={register} name="idUser" value={userData.id} />}
         <div className="form-checkout template-form">
            <h3 className="subtitle">Detalhes do pagamento</h3>
            <div className="box-field">
               <label htmlFor="card_number">Número do cartão</label>
               <InputMask
                     ref={register}
                     type="text"
                     mask={'9999 9999 9999 9999'}
                     name="card_number"
                     onChange={(event) => setCardNumber(event.target.value)}
                     value={cardNumber}
                     formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                     maskChar={null}
                  >
                  {(inputProps) => (
                     <input
                        type="text"
                        ref={register({
                           required: true
                        })}
                        value={inputProps.cardNumber}
                        name={inputProps.name}
                        className={errors.valid && 'input-error'}
                        {...inputProps}
                     />
                  )}
               </InputMask>
               {errors.card_number &&
                  <>
                     {errors.card_number?.type === "required" && <div className="error_block">Número do cartão é obrigatório.</div>}
                  </>
               }
            </div>
            <div className="box-field">
               <label htmlFor="name_card">Nome do titular do cartão</label>
               <input type="text"
                  ref={register({ required: true })}
                  name="name_card"
                  defaultValue={name_card}
                  className={errors.name_card && 'input-error'} />
               {errors.name_card &&
                  <>
                     {errors.name_card?.type === "required" && <div className="error_block">Nome do titular do cartão é obrigatório.</div>}
                  </>
               }
            </div>
            <div className={ enableCVV ? "box-field-half":'box-field'}>
               <div>
                  <label htmlFor="valid">Vencimento</label>
                  <InputMask
                     ref={register}
                     type="text"
                     mask={'99/99'}
                     name="valid"
                     onChange={(event) => setValid(event.target.value)}
                     value={valid}
                     formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                     maskChar={null}
                  >
                     {(inputProps) => (
                        <input
                           type="text"
                           ref={register({
                              required: true
                           })}
                           value={inputProps.valid}
                           name={inputProps.name}
                           className={errors.valid && 'input-error'}
                           {...inputProps}
                        />
                     )}
                  </InputMask>
                  {errors.valid &&
                     <>
                        {errors.valid?.type === "required" && <div className="error_block">Vencimento é obrigatório.</div>}
                     </>
                  }
               </div>
               {enableCVV && <div>
                  <label htmlFor="cvv">CVV</label>
                  <input type="text"
                     ref={register({ required: true })}
                     name="cvv"
                     placeholder="3 digitos na parte de trás do cartão"
                     maxLength={3}
                     className={errors.cvv && 'input-error'} />
                  {errors.cvv &&
                     <>
                        {errors.cvv?.type === "required" && <div className="error_block">CVV é obrigatório.</div>}
                     </>
                  }
               </div>}
            </div>
         </div>
      </>
   );
}

export default FormCard;