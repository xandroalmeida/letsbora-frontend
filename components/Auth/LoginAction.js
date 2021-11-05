import config from "../../config";
import { pathsMenu } from "../../utils/routes";
import Cookie from 'js-cookie';

export function LoginAction(token, pathReturn, router) {
   Cookie.set(config.cookieAuth, token, {
      expires: 90,
      path: '/',
      sameSite: 'strict'
   });

   if(pathReturn)
   {
      if(pathReturn==="checkout")
      {
         router.push(pathsMenu.checkout);
      }
      else if(pathReturn==="minha-conta") {
         router.push(pathsMenu.minhaConta);
      }
      else if(pathReturn==="dados-pessoais") {
         router.push(pathsMenu.dadosPessoais);
      }
      else if(pathReturn==="meus-pedidos") {
         router.push(pathsMenu.meusMedidos);
      }
   }
   else {
      router.push(pathsMenu.home);
   }
   return;  
}