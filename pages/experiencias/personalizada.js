import { useEffect, useState } from 'react';
import PageDefault from '../../layouts/PageDefault';
import MosaicDesktop from '../../components/MosaicGrid/MosaicDesktop';
import MosaicMobile from '../../components/MosaicGrid/MosaicMobile';
import Cookie from 'js-cookie';
import config from '../../config';

function Personalizada() {

   const [width, setWidth] = useState(0);
   const [customExpData, setCustomExpData] = useState(null);
   const [formData, setFormData] = useState(null);

   useEffect(()=>{
      window.addEventListener('resize', checkSizeViewport());
      fetchCustomExpData();

      return () => {
         window.removeEventListener('resize', checkSizeViewport());
      };
   }, []);

   function fetchCustomExpData() {
      const dataCustomExp = JSON.parse(localStorage.getItem(config.cookieCustomExperience));
      console.log('dataCustomExp', dataCustomExp);
      setCustomExpData(dataCustomExp.experiences);
      setFormData(dataCustomExp.formData);
   }

   function checkSizeViewport() {
      setWidth(window.screen.width);
   }

   return (
      <PageDefault>
         <section className="container-experiencias">
            <div className="row-personalizado">
               <div className="col-filter">
                  <div className="txt-bora">
                     {formData && 
                     <h3>E aí<br/>
                     {formData.nome},<br/>
                     bora?</h3>}
                  </div>
               </div>
               <div className="col-imgs-experiencias">
                  <div className="grid-experiencias">
                     {customExpData && width > 767 && <MosaicDesktop customExpData={customExpData} />}
                     {customExpData && width < 767 && <MosaicMobile customExpData={customExpData} />}
                  </div>
               </div>
            </div>
         </section>
      </PageDefault>
   );
}

export default Personalizada;