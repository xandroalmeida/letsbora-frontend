import Link from 'next/link';
import Carousel from '../Carousel';
import { pathsMenu } from '../../utils/routes';

function SectionIntercambio() {

   const itensCarouselExperiencias = [
      {
         thumb: '/assets/imgs/intercambio-home-1.jpg',
         title: 'Intercâmbio na África do Sul é com a Let’s Bora.'
      },
      {
         thumb: '/assets/imgs/intercambio-home-2.jpg',
         title: 'Sua viagem para África do Sul está aqui!'
      },
      {
         thumb: '/assets/imgs/intercambio-home-3.jpg',
         title: 'Confira no Let’s Bora quanto custa uma viagem para a África do Sul.'
      }];

   return (
      <section className="section intercambio">
         <div className="container">
            <h2>Intercâmbio na África do Sul</h2>
            <p className="linhaFina">Considerado o melhor destino mundial para brasileiros que buscam estudar Inglês, a África do Sul reúne praias, montanhas, gastronomia, cultura jovem, badalação e câmbio favorável.</p>
            <p className="linhaFina">Tudo em um só lugar!</p>
            <br />
            <p>Clique no botão abaixo para saber mais sobre o seu intercâmbio na África do Sul.</p>
            <div className="content-carousel">
               <Carousel items={itensCarouselExperiencias} />
            </div>
            <Link href={pathsMenu.intercambio}>
               <a class="withbox">quero saber mais</a>
            </Link>
         </div>
      </section>
   );

}

export default SectionIntercambio;