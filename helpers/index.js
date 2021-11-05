import Router from 'next/router'
import { pathsMenu } from '../utils/routes';

export function redirectPage(route) {
   console.log('route', route);
   if(route === 'intercambio')
   {
      Router.push(pathsMenu.intercambio);
   }
   else if(route === 'voluntario') {
      Router.push(pathsMenu.voluntario);
   }
}