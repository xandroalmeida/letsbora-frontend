import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { loginAction } from '../../api/connect_api';
import Loading from '../../components/Loading';
import { pathsMenu } from "../../utils/routes";
import { LoginAction } from './LoginAction';

function FormLogin({path}) {

   const { register, handleSubmit, errors } = useForm();

   const [errorLogin, setErrorLogin] = useState(null);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const onLogin = loginData => {
      console.log('loginData', loginData);
      setLoading(true);
      sendLoginInformation(loginData);
   }

   async function sendLoginInformation(loginData) {
      const loginResp = await loginAction(loginData);;
      console.log('loginResp', loginResp);

      if(loginResp.response && loginResp.response.status === 401) //401=Não autorizado
      {
         setErrorLogin(true);
         setLoading(false);
         return;
      }

      if(loginResp.status === 200)
      {
         const token = loginResp.data.token;
         LoginAction(token, path, router);
         return;
      }
   }

   return (
      <form id="form-login" onSubmit={handleSubmit(onLogin)} className="template-form">
         <div className="box-field">
            <label htmlFor="name">E-mail</label>
            <input type="text" 
            ref={register({required: true})} 
            name="email" 
            className={errors.email && 'input-error'}
            />
            { errors.email &&
               <>
               { errors.email?.type === "required" && <div className="error_block">Email é obrigatório.</div> }
               </>
            }
         </div>
         <div className="box-field">
            <label htmlFor="senha">Senha</label>
            <input type="password" 
            ref={register({required: true})} 
            name="password" 
            className={errors.password && 'input-error'}
            />
            { errors.password &&
               <>
               { errors.password?.type === "required" && <div className="error_block">Senha é obrigatório.</div> }
               </>
            }
         </div>

         {errorLogin && <div className="error-auth">Usuário ou senha inválidos.</div>}

         {loading && <Loading lighter={1} width="80" />}
         {!loading && <button type="submit" form="form-login" className="btn-salvar-info">Entrar</button>}

         <small><Link href={pathsMenu.esqueceuSenha}><a href="#" className="btn-forgot">esqueceu a senha?</a></Link></small>
      </form>
   );
}

export default FormLogin;