import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import FormLogin from '../../components/Auth/FormLogin';
import FormRegister from '../../components/Auth/FormRegister';
import PageInterna1 from '../../layouts/PageInterna1';

function Login(props) {

   const { register, handleSubmit, errors } = useForm();

   const router = useRouter();
   const path = router.query.path ? router.query.path:null;
   console.log('path', path);

   

   return (
      <PageInterna1>
         <section className="login-page section section-gray">
            <div className="container">

               <div className="grid-login">
                  <div className="form-login">
                     <h2 className="title text-center">Já tem uma conta? Faça o login abaixo</h2>
                     <FormLogin path={path} />
                  </div>
                  <div className="form-register">
                     <h2 className="title text-center">Ainda não tem um cadastro? Crie um agora mesmo</h2>
                     <FormRegister path={path} />
                  </div>
               </div>

            
            </div>
         </section>
      </PageInterna1>
   );
}

export default Login;