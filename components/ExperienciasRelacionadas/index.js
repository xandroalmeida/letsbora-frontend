import { useEffect, useState } from 'react';
import CarouselBtns from '../../components/CarouselBtns';
import {getExperiencesRelations} from '../../api/connect_api';

function ExperienciasRelacionadas(props) {

   const [objExpRelacionadas, setObjExpRelacionadas] = useState();

   useEffect(()=>{
      fetchRelations();
   },[]);

   async function fetchRelations() {
      const relations = await getExperiencesRelations(props.idExp);
      console.log('relations', relations);
      if(!relations.data.error)
      {
         setObjExpRelacionadas(relations.data.relations);
         return;
      }

      console.error(relations.data.message);
   }

   return (
      <div className="experiencias-relacionadas">
         <h3>experiências relacionadas</h3>
         <div className="wrap-content">
            <div className="content-relacionadas">
               {objExpRelacionadas && <CarouselBtns items={objExpRelacionadas} properties={{ centerMode: false, className: '' }} totalShow={objExpRelacionadas.length > 4 ? 4:objExpRelacionadas.length} />}
            </div>
         </div>
      </div>
   );
}

export default ExperienciasRelacionadas;