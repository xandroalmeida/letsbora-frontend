import Blog from '../components/Blog';
import Hero from '../components/Hero';
import ExperienciasHome from '../components/SectionExperiencias';
import Intercambio from '../components/SectionIntercambio';
import SectionLetsGuide from '../components/SectionLetsGuide';
import SectionVideo from '../components/SectionVideo';
import PageDefault from '../layouts/PageDefault';

export default function Home() {

   const itensCarouselExperiencias = ['intercambio1.jpg', 'intercambio2.jpg', 'intercambio3.jpg'];

   return (
      <PageDefault>
         <Hero />
         <Intercambio />
         <ExperienciasHome />
         <SectionVideo />
         <SectionLetsGuide />
         <Blog />
      </PageDefault>
   )
}
