import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';
import { splitArray } from '../../utils/utils';
import ImageContainer from '../ImageContainer';

const arrTemplatesGridSort = [
   'template1','template2', 'template3'
];

function GridExperiencias(props) {

   function renderItens() {
      const arrItens = [];
      let controladorNewDiv = 0;

      const newArr = splitArray(3, props.data);
      
      let contadorDiv = 0;
      for (let index = props.start; index <= props.end; index++) {

         contadorDiv ++;
         const element = newArr[index];
         if(!element)
         {
            break;
         }
         const randomTemplate = arrTemplatesGridSort[Math.floor(Math.random() * arrTemplatesGridSort.length)];
         
         let contador = 0;
         const itens = element.map(item => {
            contador ++;
            let thumbHorizontal=[];
            if(item.mediasIdmedias)
            {
               thumbHorizontal = item.mediasIdmedias.filter((thumb)=>{
                  if(thumb.type==="thumb-horizontal")
                  {
                     return thumb;
                  }
               });
            }
            else {
               thumbHorizontal.push(
                  {
                     path: item.thumb
                  }
               );
            }

            if(item.slug === "intercambio" || item.slug === "voluntario") {
               return;
            }
            
            return (
               <Link key={`exp-${item.idexperiencias}-${contador}`} href={`${pathsMenu.experiencias}/${item.slug}`}>
                  <a target="_blank" className={`item-experiencia`}>
                     <div className="thumb-experiencia">
                        {thumbHorizontal && thumbHorizontal[0] && <ImageContainer src={`${thumbHorizontal[0].path}`} alt={item.name} />}
                        {thumbHorizontal && !thumbHorizontal[0] && <ImageContainer src={`/assets/imgs/post1.jpg`} alt={item.name} />}
                     </div>
                     <div className="post-meta">
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                     </div>
                  </a>
               </Link>
            );
         });

         arrItens.push(
            <div key={`exp-${contadorDiv}`} className={`grid-experiencias ${randomTemplate}`}>
               {itens}
            </div>
         );

         controladorNewDiv++;
      }

      return arrItens;
   }

   return (
      <>
         { props.data && renderItens()}
      </>
   );
}

export default GridExperiencias;