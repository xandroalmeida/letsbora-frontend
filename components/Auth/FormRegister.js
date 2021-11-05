import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { registerAction } from '../../api/connect_api';
import { pathsMenu } from '../../utils/routes';
import Loading from '../Loading';
import { LoginAction } from "./LoginAction";

function FormRegister({ path }) {

   const { register, handleSubmit, errors, watch } = useForm();
   const password = useRef({});
   password.current = watch("password", "");
   const router = useRouter();

   const [errorLogin, setErrorLogin] = useState(null);
   const [loading, setLoading] = useState(false);

   const onRegister = registerData => {
      console.log('registerData', registerData);
      setErrorLogin(false);
      setLoading(false);

      const objPost = {
         name: registerData.name,
         _username: registerData.email,
         _password: registerData.password
      }

      setLoading(true);
      sendUser(objPost);
   }

   async function sendUser(data) {
      const respApi = await registerAction(data);
      
      if(respApi.data.error === 1)
      {
         setErrorLogin(true);
         setLoading(false);
         return;
      }

      if(respApi.data.token)
      {
         const token = respApi.data.token;
         LoginAction(token, path, router);
         return;
      }

      setLoading(false);
   }

   return (
      <form id="form-register" onSubmit={handleSubmit(onRegister)} className="template-form">
         <div className="box-field">
            <label htmlFor="name">Nome</label>
            <input type="text"
               name="name"
               ref={register({ required: true })}
               className={errors.name && 'input-error'}
            />
            {errors.name &&
               <>
                  {errors.name?.type === "required" && <div className="error_block">Nome é obrigatório.</div>}
               </>
            }
         </div>
         <div className="box-field">
            <label htmlFor="name">E-mail</label>
            <input type="text"
               ref={register({ required: true, pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/ })}
               name="email"
               className={errors.email && 'input-error'}
            />
            {errors.email &&
               <>
                  {errors.email?.type === "required" && <div className="error_block">Email é obrigatório.</div>}
                  {errors.email?.type === "pattern" && <div className="error_block">Email inválido.</div>}
               </>
            }
         </div>
         <div className="box-field">
            <label htmlFor="senha">Senha</label>
            <input type="password"
               ref={register({ required: true })}
               name="password"
               className={errors.password && 'input-error'}
            />
            {errors.password &&
               <>
                  {errors.password?.type === "required" && <div className="error_block">Senha é obrigatório.</div>}
               </>
            }
         </div>
         <div className="box-field">
            <label htmlFor="senha">Confirmar Senha</label>
            <input type="password"
               ref={register({
                  validate: value =>
                     value === password.current || "As senha não são iguais."
               })}
               name="password_repeat"
               className={errors.password_repeat && 'input-error'}
            />
            {errors.password_repeat && <div className="error_block">{errors.password_repeat.message}</div>}
         </div>
         
         {errorLogin && <div className="error-auth">Email já existe em nosso sistema. Clique <Link href={pathsMenu.esqueceuSenha}><a>aqui</a></Link> para redefinir sua senha.</div>}

         {loading && <Loading lighter={1} width="80" />}
         {!loading && <button type="submit" form="form-register" className="btn-salvar-info">Cadastrar</button>}
      </form>
   );
}

export default FormRegister;