import { useState } from 'react';
import { useForm } from "react-hook-form";
import { updateCardUser } from '../../api/connect_api';
import FormCard from '../../components/Checkout/FormCheckout/FormCard';
import Loading from '../../components/Loading';
import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PageInterna1 from '../../layouts/PageInterna1';
import { decryptTokenAuth } from '../../utils/utils';

function MeusPedidos({initialUserValue}) {

   const { register, handleSubmit, errors } = useForm();

   const loginData = initialUserValue ? JSON.parse(decryptTokenAuth(initialUserValue)):null;
   
   const [sending, setSending] = useState(false);
   const [updatedSuccess, setUpdatedSuccess] = useState(false);
   const [updatedFailed, setUpdatedFailed] = useState(false);
   const [messageFailed, setMessageFailed] = useState('');

   const onSubmit = formData => {
      console.log('formData', formData);
      setUpdatedSuccess(false);
      setSending(false);
      setUpdatedFailed(false);
      setUpdatedFailed(false);
      setMessageFailed('');
      updateInfoUser(formData);
   }

   async function updateInfoUser(userData) {
      setSending(true);
      const updated = await updateCardUser(userData);
      console.log('updated', updated);
      if(updated.data.error === 1)
      {
         setUpdatedFailed(true);
         setMessageFailed(updated.data.message);
         setSending(false);
         return;
      }
      setSending(false);
      setUpdatedSuccess(true);
   }

   return (
      <PageInterna1>
         <section className="minha-conta minha-conta-interna section section-gray">
            <div className="container">
               <MenuMinhaConta page="pagamento" />

               <h2 className="title text-center">Informações de Pagamento</h2>

               {updatedSuccess && <div className="alert-success text-center alert-feedback mb-60">
                  <i className="fas fa-check-square"></i> 
                  Informações atualizadas com sucesso.
                  <div onClick={()=>setUpdatedSuccess(false)} className="close">X</div>
               </div>}

               {updatedFailed && <div className="alert-danger text-center alert-feedback mb-60">
                  <i className="fas fa-window-close"></i> 
                  {messageFailed}
                  <div onClick={()=>setUpdatedFailed(false)} className="close">X</div>
               </div>}

               <form onSubmit={handleSubmit(onSubmit)} className="template-form">
                  <FormCard register={register} errors={errors} userDataCookie={loginData} />
                  
                  {sending && <Loading lighter={1} width={80} />}
                  {!sending && <button type="submit" href="#" className="btn-salvar-info">Salvar informações</button>}
               </form>
            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const authInfo = req.cookies.letsboraauthinfo ? req.cookies.letsboraauthinfo : null;

   if(!authInfo || authInfo.length === 0) //se nao existeir nenhuma informação de login, mando o user fazer o login
   {
      res.writeHead(307, { Location: `${pathsMenu.login}?path=dados-pessoais` });
      res.end();
   }

   return {
      props: {
         initialUserValue: authInfo
      }
   }
}

export default MeusPedidos;