import Link from 'next/link';
import Carousel from '../Carousel';
import { pathsMenu } from '../../utils/routes';
import { useEffect, useState } from 'react';

function SectionExperiencias() {

   const [thumbsLoad, setThumbLoad] = useState(null);
   const [animated, setAnimated] = useState(null);

   const arrCategories = ["esportes", "gastro", "lazer", "cultura"];

   const itensCarouselExperiencias = {
      esportes: [
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-10.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-15.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-16.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-20.jpg' },
      ],
      gastro: [
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-2.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-6.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-17.jpg' },
      ],
      lazer: [
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-3.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-4.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-5.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-11.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-12.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-14.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-18.jpg' },
      ],
      cultura: [
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-1.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-7.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-8.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-9.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-13.jpg' },
         { thumb: '/assets/imgs/experiencias-home/experiencia-home-19.jpg' },
      ]
   };

   let interval = null;

   useEffect(() => {
      randomizeThumbs(0);
      interval = setInterval(() => {
         randomizeThumbs(1);
      }, 5000);

      return () => {
         clearInterval(interval);
      }
   }, []);

   function randomizeThumbs(animated) {
      const categories = randomCategories();

      const thumbsToLoad = categories.map((categoria) => {
         const elementImages = itensCarouselExperiencias[categoria];
         const ramdomImage = Math.floor(Math.random() * elementImages.length);
         return elementImages[ramdomImage];
      });

      setThumbLoad(thumbsToLoad);
      setAnimated(animated);
   }

   function randomCategories() {
      const res = arrCategories.sort(function () {
         return 0.5 - Math.random();
      });

      return res.slice(res, 3);
   }


   return (
      <section className="section experiencia">
         <div className="container">
            <h2>Experiências de Viagem à África do Sul</h2>
            <p className="linhaFina">Uma nova forma de viajar, explorar e conectar! Monte o seu <Link href={pathsMenu.expPersonalizar}>roteiro de viagem para a África do Sul</Link> com experiências exclusivas, customizadas para o seu estilo de vida, com aquela pitada de emoção e verdade que só os locais conhecem.</p>
            <div className="content-carousel">
               {thumbsLoad && <Carousel items={thumbsLoad} animated={animated} />}
            </div>
            <Link href={pathsMenu.expPersonalizar}>personalizar minha experiência</Link>
         </div>
      </section>
   );

}

export default SectionExperiencias;