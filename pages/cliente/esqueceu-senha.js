import { useState } from 'react';
import { sendEmailForgotApi } from '../../api/connect_api';
import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PageInterna1 from '../../layouts/PageInterna1';
import Loading from '../../components/Loading';

function EsqueceuSenha() {

   const [isSending, setIsSending] = useState(false);
   const [sent, setSent] = useState(false);
   const [email, setEmail] = useState("");
   const [emailError, setEmailError] = useState(false);
   const [messageError, setMessageError] = useState("");

   async function sendEmail() {
      if(email.trim() === "") {
         setEmailError(true);
         return;
      }
      setIsSending(true);
      const resp = await sendEmailForgotApi({email});

      setIsSending(false);
      
      if(resp.data.error) {
         setMessageError(resp.data.message);
         return;
      }
      setSent(true);
   }

   return (
      <PageInterna1>
         <section className="minha-conta section section-gray">
            <div className="container">
               <h2 className="title text-center">Esqueceu a senha?</h2>
               
               {!sent && <div className="form-esqueceu">
                  <h3 className="subtitle text-center">Digite seu email cadastrado abaixo e siga as instruções do email</h3>
                  <form action="#" className="template-form">
                     <div className="box-field">
                        <label htmlFor="name">E-mail</label>
                        <input 
                           type="text" 
                           name="email"
                           value={email}
                           onChange={(e)=>setEmail(e.currentTarget.value)}
                           className={emailError && 'input-error'}
                        />
                     </div>
                     {messageError && <h4 className="subtitle text-center">{messageError}</h4>}
                     {isSending && <Loading lighter={1} width={60} />}
                     {!isSending && <a href="#" onClick={()=>sendEmail()} className="btn-salvar-info">Enviar</a>}
                  </form>
               </div>}

               {sent && <div className="form-esqueceu">
                  <h3 className="subtitle text-center">Email enviado com sucesso. Aguarde alguns minutos e verifique sua caixa de email e de SPAM para prosseguir com a alteração de senha.</h3>
               </div>}

               
            </div>
         </section>
      </PageInterna1>
   );
}

export default EsqueceuSenha;