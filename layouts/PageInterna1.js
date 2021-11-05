import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PageInterna1({ children }) {

   return (
      <>
         <Head>
            <title>Let’s Bora | Intercâmbio: África do Sul | Viagem e Dicas</title>
            <meta name="description" content="Aproximando pessoas e proporcionando experiências inesquecíveis. Com a Let’s Bora você garante sua viagem para a África do Sul agora mesmo. Confira!"></meta>
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