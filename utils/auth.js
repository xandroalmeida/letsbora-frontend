import Cookie from 'js-cookie';
import config from '../config';
import { pathsMenu } from './routes';

export function checkLogin() {
   const isLoggedIn = Cookie.get(config.cookieAuth);
   return isLoggedIn;
}

export function logoutAction() {
   Cookie.remove(config.cookieAuth);
   window.location.href = pathsMenu.home;
}