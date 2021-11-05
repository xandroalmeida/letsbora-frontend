import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { wrapper } from '../redux/storeConfig';
import '../styles/globals.scss';
import Router from 'next/router';
import { GTMPageView } from '../utils/gtm';

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      const handleRouteChange = (url) => GTMPageView(url);
      Router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
         Router.events.off('routeChangeComplete', handleRouteChange);
      };
   }, []);

   return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
