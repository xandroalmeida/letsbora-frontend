import { useEffect, useState } from 'react';
import { sendNewPassApi } from '../../api/connect_api';
import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PageInterna1 from '../../layouts/PageInterna1';
import Loading from '../../components/Loading';
import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';
import Router, { useRouter } from 'next/router';

function EsqueceuSenha({id, tokenPass}) {

   const [isSending, setIsSending] = useState(false);
   const [sent, setSent] = useState(false);
   const [password, setPassword] = useState("");
   const [cpassword, setCPassword] = useState("");
   const [passwordError, setPasswordError] = useState(false);
   const [cpasswordError, setCPasswordError] = useState(false);
   const [messageError, setMessageError] = useState("");
   const [feedBackError, setFeedBackError] = useState("");
   
   const [idUser, setIdUser] = useState("");
   const [token, setToken] = useState("");

   useEffect(()=> {

      if(!id || !tokenPass) {
         Router.push(pathsMenu.login);
      }

      setIdUser(id);
      setToken(tokenPass);
   }, []);

   async function changePassword() {
      if(password.trim() === "") {
         setPasswordError(true);
         return;
      }

      if(cpassword.trim() === "") {
         setCPasswordError(true);
         return;
      }

      if(password.trim() !== cpassword.trim()) {
         setPasswordError(true);
         setCPasswordError(true);
         setFeedBackError('Digite senha iguais.');
         return;
      }

      setIsSending(true);
      const resp = await sendNewPassApi({
         id: idUser,
         tokenPass: token,
         senha: password
      });

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
               <h2 className="title text-center">Altere sua senha</h2>
               
               {!sent && <div className="form-esqueceu">
                  <h3 className="subtitle text-center">{feedBackError ? feedBackError: 'Digite sua nova senha'}</h3>
                  <form action="#" className="template-form">
                     <div className="box-field">
                        <label htmlFor="name">Senha</label>
                        <input 
                           type="password" 
                           name="pass"
                           value={password}
                           onChange={(e)=>setPassword(e.currentTarget.value)}
                           className={passwordError && 'input-error'}
                        />
                     </div>
                     <div className="box-field">
                        <label htmlFor="name">Confirmar Senha</label>
                        <input 
                           type="password" 
                           name="pass"
                           value={cpassword}
                           onChange={(e)=>setCPassword(e.currentTarget.value)}
                           className={cpasswordError && 'input-error'}
                        />
                     </div>
                     {messageError && <h4 className="subtitle text-center">{messageError}</h4>}
                     {isSending && <Loading lighter={1} width={60} />}
                     {!isSending && <a href="#" onClick={()=>changePassword()} className="btn-salvar-info">Enviar</a>}
                  </form>
               </div>}

               {sent && <div className="form-esqueceu">
                  <h3 className="subtitle text-center">Senha alterada com sucesso. Clique no botão abaixo para realizar o login novamente.</h3>
                  <Link href={pathsMenu.login}>
                     <a className="btn-salvar-info">Fazer login</a>
                  </Link>
               </div>}

               
            </div>
         </section>
      </PageInterna1>
   );
}

EsqueceuSenha.getInitialProps = async ({query}) => {
   return { id: query.id, tokenPass: query.key }
 }

export default EsqueceuSenha;