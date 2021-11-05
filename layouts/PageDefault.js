import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {baseUrl} from '../utils/utils';

function PageDefault({ children }) {

   return (
      <>
         <Head>
            <title>Let's Bora - Aproximando pessoas e proporcionando experiências inesquecíveis.</title>
         </Head>
         <Header />
         <main>
            {children}
         </main>
         <Footer />
      </>
   );
}

export default PageDefault;