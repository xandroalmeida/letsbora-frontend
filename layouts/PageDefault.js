import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PageDefault({ children, title, description }) {

   return (
      <>
         <Head>
            <title>{title || 'Let’s Bora | Intercâmbio: África do Sul | Viagem e Dicas'} </title>
            <meta name="description" content={`${description || 'Aproximando pessoas e proporcionando experiências inesquecíveis. Com a Let’s Bora você garante sua viagem para a África do Sul agora mesmo. Confira!'}`}></meta>
         </Head>
         <Header />
         <main>
            {children}
         </main>
         <Footer/>
      </>
   );
}

export default PageDefault;