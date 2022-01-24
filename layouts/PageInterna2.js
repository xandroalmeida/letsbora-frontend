import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PageInterna2({ children }) {

   return (
      <>
         <Header classAdd="bgFilled" />
         <main>
            {children}
         </main>
         <Footer/>
      </>
   );
}

export default PageInterna2;