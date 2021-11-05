import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PageInterna1({ children }) {

   return (
      <>
         <Head>
            <title>Let's Bora - Aproximando pessoas e proporcionando experiências inesquecíveis.</title>
         </Head>
         <Header classAdd="bgFilled" />
         <main>
            {children}
         </main>
         <Footer />
      </>
   );
}

export default PageInterna1;