import { useEffect, useState } from 'react';
import AccordionPedidos from '../../components/MinhaConta/AccordionPedidos';
import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PageInterna1 from '../../layouts/PageInterna1';
import {getAllOrdersUser} from '../../api/connect_api';
import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';
import { decryptTokenAuth } from '../../utils/utils';

function MeusPedidos({initialUserValue}) {

   const [userData] = useState(initialUserValue ? JSON.parse(decryptTokenAuth(initialUserValue)):null);
   const [orderData, setOrderdData] = useState(null);

   useEffect(()=>{
      fetchMyOrders();
   }, []);

   async function fetchMyOrders() {
      const myOrders = await getAllOrdersUser(userData.id);
      setOrderdData(myOrders.data);
      console.log('orderData', orderData);
   }

   return (
      <PageInterna1>
         <section className="minha-conta minha-conta-interna section section-gray">
            <div className="container">
               <MenuMinhaConta page="pedidos" />

               <h2 className="title text-center">Meus Pedidos</h2>

               <div className="container-pedidos">
                  {(!orderData || orderData.length === 0) &&  <>
                     <h3 className="text-center">Nenhum pedido foi realizado.</h3>
                     <Link href={pathsMenu.experiencias}>
                        <a className="btn-salvar-info">Explorar experiências</a>
                     </Link>
                  </>}
                  
                  {orderData && orderData.length > 0 && orderData.map((item, index)=>{
                     return <AccordionPedidos key={`pedido-${index}`} item={item} />;
                  })}
                  
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const authInfo = req.cookies.letsboraauthinfo ? req.cookies.letsboraauthinfo : null;

   if(!authInfo || authInfo.length === 0) //se nao existeir nenhuma informação de login, mando o user fazer o login
   {
      res.writeHead(307, { Location: `${pathsMenu.login}?path=meus-pedidos` });
      res.end();
   }

   return {
      props: {
         initialUserValue: authInfo
      }
   }
}

export default MeusPedidos;