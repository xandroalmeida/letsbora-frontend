import { useEffect, useState } from 'react';
import PageDefault from '../../layouts/PageDefault';
import FormPersonalizacao from '../../components/FormPersonalizacao';
import ImageContainer from '../../components/ImageContainer';

function Personalizar() {

   const [currentStep, setCurrentStep] = useState(1);

   function changeStep(step) {
      setCurrentStep(step);
   }

   return (
      <PageDefault>
         <section className="container-experiencias-filtrar">
            <div className="row">
               <div className="col-filter">
                  <div></div>
                  <FormPersonalizacao onChangeStep={(step) => changeStep(step)} />
                  <div></div>
               </div>
               <div className="col-imgs-experiencias">
                  {currentStep === 1 && <ImageContainer src="/assets/imgs/img_filtro_experiencia_step1.jpg" alt="Experiências Personalização 1" />}
                  {currentStep === 2 && <ImageContainer src="/assets/imgs/img_filtro_experiencia_step2.jpg" alt="Experiências Personalização 2" />}
               </div>
            </div>
         </section>
      </PageDefault>
   );
}

export default Personalizar;