import Link from 'next/link';
import Carousel from '../Carousel';
import {pathsMenu} from '../../utils/routes';

function SectionIntercambio() {

   const itensCarouselExperiencias = [
      { 
         thumb: '/assets/imgs/intercambio-home-1.jpg', 
      },
      { 
         thumb: '/assets/imgs/intercambio-home-2.jpg', 
      },
      {
         thumb: '/assets/imgs/intercambio-home-3.jpg',
      }];

   return (
      <section className="section intercambio">
         <div className="container">
            <h2>Intercâmbio</h2>
            <p className="linhaFina">Considerado o melhor destino mundial para brasileiros que buscam estudar Inglês, a África do Sul reúne praias, montanhas, gastronomia, cultura jovem, badalação e câmbio favorável.</p>
            <p className="linhaFina">Tudo em um só lugar!</p>
            <div className="content-carousel">
               <Carousel items={itensCarouselExperiencias} />
            </div>
            <Link href={pathsMenu.intercambio}>
               <a>quero saber mais</a>
            </Link>
         </div>
      </section>
   );

}

export default SectionIntercambio;