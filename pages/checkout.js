import Cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkoutAction } from '../api/connect_api';
import FormCheckout from '../components/Checkout/FormCheckout';
import ModalCoupon from '../components/Checkout/ModalCoupon';
import Loading from '../components/Loading';
import config from '../config';
import PageInterna1 from '../layouts/PageInterna1';
import { cartData } from '../redux/actions/cart';
import { pathsMenu } from '../utils/routes';
import { currencyFormat, decryptTokenAuth } from '../utils/utils';

function Checkout(props) {

   console.log('initialUserValue', props.initialUserValue);
   const loginData = props.initialUserValue ? JSON.parse(decryptTokenAuth(props.initialUserValue)):null;

   console.log('loginData', loginData);

   const [cartData, setCartData] = useState([]);
   const [loadingInfoGateway, setLoadingInfoGateway] = useState(false);
   const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
   const [errorReturnGateway, setErrorReturnGateway] = useState(false);
   const [openCupomModal, setOpenCupomModal] = useState(false);
   const [cupomUsed, setCupomUsed] = useState(false);
   const [installments, setInstallments] = useState(1);
   const [typePayment, setTypePayment] = useState('credit_card');
   const [totalCheckout, setTotalCheckout] = useState(null);

   useEffect(() => {
      cartData && calculateTotalCheckout();
   }, [cartData])

   useEffect(() => {
      setCartData(props.cart.cart);
   }, [props.cart])

   function calculateTotalCheckout() {
      let totalCheckoutToSAve = 0;

      for (let index = 0; index < cartData.length; index++) {
         const element = cartData[index];
         totalCheckoutToSAve = totalCheckoutToSAve + element.total;       
      }

      if(cupomUsed)
      {
         if(cupomUsed.type === 'fixed') {
            totalCheckoutToSAve = totalCheckoutToSAve - cupomUsed.value;
         } 
         else 
         {
            totalCheckoutToSAve = totalCheckoutToSAve * (cupomUsed.value/100);
         }
         console.log(cartData);
      }

      console.log('totalCheckoutToSAve', totalCheckoutToSAve);
      setTotalCheckout(totalCheckoutToSAve);
   }

   async function handleSubmitFormToGateway(data) {
      console.log('dataform', data);
      setErrorReturnGateway(null);
      setLoadingInfoGateway(true);

      //add cart
      const dataFinal = {...data};

      dataFinal['parcelas'] = installments;
      if(cupomUsed)
      {
         dataFinal['cupom'] = JSON.stringify(cupomUsed);
      }

      dataFinal['tipoPagamento'] = typePayment;

      // console.log('datafinal', dataFinal);

      const gatewayResp = await checkoutAction(dataFinal);
      console.log('gatewayResp', gatewayResp);

      if(gatewayResp.response && gatewayResp.response.status === 500)
      {
         setErrorReturnGateway("Tivemos um problema de comunicação. Por favor entre em contato com o nosso suporte em: suporte@letsbora.com.br.");
         setLoadingInfoGateway(false);
         return;
      }

      if(gatewayResp.data.error === 1)
      {
         setErrorReturnGateway(gatewayResp.data.message);
         setLoadingInfoGateway(false);
         return;
      }
      
      if(gatewayResp.data.error === 0) //o cartão autorizou sem problemas
      {
         Cookie.remove(config.cookieCart);
         props.onCartData([]);
         Router.push({
            pathname: pathsMenu.obrigado,
            query: { id: gatewayResp.data.id }
        })
      }
   }

   function applyCupom(cupom) {
      setCupomUsed(cupom);
   }

   function renderCupomRow() {
      return (
         <div className="box-cupom">
            Cupom utilizado
            <span>{cupomUsed.type === 'fixed' ? currencyFormat(cupomUsed.value):cupomUsed.value+'%'}</span>
         </div>
      );
   }

   function checkOptionsParcelamento() {
      const returnParcelamentos = [
         <option value="1">1x de {currencyFormat(totalCheckout)}</option>
      ];
      if(totalCheckout > 300)
      {
         const valorParcelado = parseFloat(totalCheckout/2);
         returnParcelamentos.push(
            <option value="2">2x de {currencyFormat(valorParcelado)}</option>
         );
      }

      if(totalCheckout > 450)
      {
         const valorParcelado = parseFloat(totalCheckout/3);
         returnParcelamentos.push(
            <option value="3">3x de {currencyFormat(valorParcelado)}</option>
         );
      }

      return returnParcelamentos;
   }

   return (
      <PageInterna1>
         <section className="checkout section section-gray">
            <div className="container">
               <h2 className="title text-center">Checkout</h2>

               <div className="grid-checkout">

                  <FormCheckout userData={loginData} cartData={cartData} submitButtonClicked={submitButtonClicked} onHandleSubmitFormToGateway={(data)=>handleSubmitFormToGateway(data)} typePayment={typePayment} />
                  <div className="form-resume-purchase">
                     <h3 className="subtitle">Resumo da compra</h3>

                     <div className="box-itens-checkout">

                        {cartData && cartData.length > 0 && cartData.map((item, index) => {
                           return (
                              <div className="row-item">
                                 <div className="col-left">
                                    <h3>{item.name}</h3>
                                    <p>Data escolhida: <strong>{new Date(item.selectedDay).toLocaleDateString()}</strong></p>
                                 </div>
                                 <div className="col-right">
                                    <div className="sub-total">{currencyFormat(item.total)}</div>
                                    <div className="parcelamento">{item.totalAdults} Adulto(s)<br/>{item.totalKids > 0 ? `${item.totalKids} crianca(s)` : ''}</div>
                                 </div>
                              </div>
                           );
                        })}

                        {cupomUsed && renderCupomRow()}

                        {cartData && cartData.length > 0 && <>
                        <div className="box-total">
                           Total
                           <span>{totalCheckout && currencyFormat(totalCheckout)}</span>
                        </div>

                        <div className="box-parcelamento">
                           Forma de pagamento:
                           <div className="box-select">
                              <i className="fas fa-chevron-down"></i>
                              <select
                                 onChange={(e)=>{setTypePayment(e.target.value)}}
                              >
                                 <option value="credit_card">Cartão de crédito</option>
                                 <option value="transfer">PIX</option>
                                 {/* <option value="boleto">Boleto</option> */}
                              </select>
                           </div>
                        </div>
                        
                        {totalCheckout && totalCheckout > 300 && typePayment !== 'transfer' &&
                           <div className="box-parcelamento">
                              Pagar em:
                              <div className="box-select">
                                 <i className="fas fa-chevron-down"></i>
                                 <select
                                    onChange={(e)=>{setInstallments(e.target.value)}}
                                 >
                                    {checkOptionsParcelamento()}
                                 </select>
                              </div>
                           </div>
                        }
                        
                        {totalCheckout && typePayment === 'transfer' &&
                           <div className="text-pix">
                              Após confirmar a compra faça a transferência Pix na chave <strong>40.506.881/0001-31</strong>. Conclua a transferência e envie um e-mail para <strong>hello@letsborabr.com</strong> com o comprovante de pagamento para que sua transação seja concluída.
                           </div>
                        }

                        </>}

                     </div>
                     {!cupomUsed && <div onClick={()=>setOpenCupomModal(true)} className="cupom-algum">
                        Possui algum cupom?
                     </div>}

                     <p className="condicoes">Ao fazer seu pedido, você concorda com as Condições de Uso da Let’s Bora.<br/>Por favor verifique a Notificação de Privacidade, Notificação de Cookies e a Notificação de Anúncios Baseados em Interesse.</p>
                     
                     {!loadingInfoGateway && <div className="actions-cart">
                        <button type="submit" form="form-checkout" className="btn-finalizar">finalizar a compra</button>
                     </div>}

                     {errorReturnGateway && <div className="txt-error-resp-gateway">{errorReturnGateway}</div>}

                     {loadingInfoGateway && <><div className="loading-gateway"><Loading lighter={1} /><h4>Por favor aguarde enquanto estamos nos comunicando com o banco</h4></div></>}
                  </div>
                  <div className="form-card-information">
                     {/* <FormPagamento submitButtonClicked={submitButtonClicked} /> */}
                  </div>
               </div>

               <ModalCoupon cartData={cartData} onCupomApplied={(cupom)=>applyCupom(cupom)} openCupomModal={openCupomModal} onHideModal={()=>setOpenCupomModal(false)} />

            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const authInfo = req.cookies.letsboraauthinfo ? req.cookies.letsboraauthinfo : null;
   const cartJson = req.cookies.letsboracart ? JSON.parse(req.cookies.letsboracart) : [];

   if(!authInfo || authInfo.length === 0) //se nao existir nenhuma informação de login, mando o user fazer o login
   {
      res.writeHead(307, { Location: `${pathsMenu.login}?path=checkout` });
      res.end();
      return { props: {} };
   }

   if(!cartJson || cartJson.length === 0) //se nao existir nenhum produto adiciondo ao cart
   {
      res.writeHead(307, { Location: `${pathsMenu.home}` });
      res.end();
      return { props: {} };
   }

   return {
      props: {
         initialCartValue: cartJson,
         initialUserValue: authInfo
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);