import Link from 'next/link';
import { useEffect, useState } from 'react';
import PageInterna1 from '../layouts/PageInterna1';
import ImageContainer from "../components/ImageContainer";
import {useRouter} from 'next/router';
import {getInfoOrderDetails} from '../api/connect_api';
import Loading from '../components/Loading';
import { currencyFormat, decryptTokenAuth } from '../utils/utils';

function Obrigado({userDataCookie}) {

   const router = useRouter();
   const id = router.query.id ? router.query.id:null;

   const [userData] = useState(userDataCookie ? JSON.parse(decryptTokenAuth(userDataCookie)):null);

   const [dataPurchase, setDataPurchase] = useState(null);
   const [cartData, setCartData] = useState(null);
   const [loadindData, setLoadindData] = useState(false);

   useEffect(() => {
      fetchOrderDetail();
   }, []);

   useEffect(() => {
      console.log('userDataCookie', userDataCookie);
   }, [userDataCookie]);

   async function fetchOrderDetail() {
      setLoadindData(true);
      const orderDetailData = await getInfoOrderDetails(id);
      setDataPurchase(orderDetailData.data);
      setCartData(JSON.parse(orderDetailData.data.cart));
      
      //verifico se essa ordem eh mesmo do usuario logado
      if(userData && userData.id !== orderDetailData.data.usersIdusers)
      {
         setDataPurchase(null);
         setCartData(null);
      }
      //

      setLoadindData(false);
   }

   return (
      <PageInterna1>
         <section className="thanks-page section section-gray">
            <div className="container">
               {loadindData && <Loading lighter={1} width={80} />}
               {!dataPurchase && !loadindData && <h2 className="title text-center">Nenhuma compra encontrada</h2>}
               {dataPurchase && <>
                  <h2 className="title text-center">Obrigado pela compra!</h2>

                  <div className="detalhes-compra">
                     <h3 className="subtitle">Detalhes da compra</h3>
                     <h4><span>Protocolo:</span> {dataPurchase.protocol}</h4>
                  </div>

                  <div className="box-itens-checkout">
                     {cartData && cartData.length > 0 && cartData.map((item, index) => {
                        return (
                           <div key={`item-${index}`} className="row-item">
                              <div className="col-left">
                                 <h3>{item.name}</h3>
                                 <p>Data escolhida: <strong>{new Date(item.selectedDay).toLocaleDateString()}</strong></p>
                              </div>
                              <div className="col-right">
                                 <div className="sub-total">{currencyFormat(item.total)}</div>
                                 <div className="parcelamento">{item.totalAdults} Adulto(s) {item.totalKids > 0 ? `e ${item.totalKids} crianca(s)` : ''}</div>
                              </div>
                           </div>
                        );
                     })}

                     {dataPurchase.couponsIdcoupon && <div className="box-cupom">
                        Cupom utilizado
                        <span>{dataPurchase.couponsIdcoupon.type === 'fixed' ? currencyFormat(dataPurchase.couponsIdcoupon.value):dataPurchase.couponsIdcoupon.value+'%'}</span>
                     </div>}

                     <div className="box-total">
                        Total
                        <span>{currencyFormat(dataPurchase.value)}</span>
                     </div>
                  </div>

                  <div className="email-warning">Confira seu email para os próximos passos.</div>

                  <Link href="/cliente/meus-pedidos">
                     <a className="btn-meus-pedidos">meu pedidos</a>
                  </Link>

                  <div className="icon-lets-bora">
                     <ImageContainer src="/assets/imgs/icon_letsbora.svg" alt="Lets Bora" />
                  </div>
               </>}
            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const authInfo = req.cookies.letsboraauthinfo ? req.cookies.letsboraauthinfo : null;

   if(!authInfo || authInfo.length === 0) //se nao existeir nenhuma informação de login, mando o user fazer o login
   {
      res.writeHead(307, { Location: `${pathsMenu.login}?path=checkout` });
      res.end();
   }

   return {
      props: {
         userDataCookie: authInfo
      }
   }
}


export default Obrigado;