import { useEffect, useState } from "react";

function FeaturesExp({ expInfoData, jsonRestrictionsList, jsonIncludedList, jsonNotIncludedList }) {

   const [width, setWidth] = useState(0);

   useEffect(() => {
      window.addEventListener('resize', checkSizeViewport());

      return () => {
         window.removeEventListener('resize', checkSizeViewport());
      };
   }, []);

   function checkSizeViewport() {
      setWidth(window.screen.width);
   }

   return (
      <div className="info-adicional">
         <div className="container">
            {width > 768 && <ul>
               <li>
                  <img src="/assets/imgs/icons/icon_agenda.svg" alt="Agenda" width="20" height="20" />
                  <span>Duração mínima de:</span> {expInfoData.duration} dias
               </li>
               <li>
                  <img src="/assets/imgs/icons/icon_pin.svg" alt="Localização" width="15" height="20" />
                  <span>Local da Experiência:</span>{expInfoData.citiesIdcities.name}
               </li>
               {expInfoData.minAge && <>
                  <li>
                     <img src="/assets/imgs/icons/icon_user.svg" alt="Idade mínima" width="18" height="20" />
                     <span>Idade Mínima:</span> {expInfoData.minAge}
                  </li></>}
            </ul>}

            {width <= 768 && <ul>
               <li>
                  <img src="/assets/imgs/icons/icon_agenda.svg" alt="Agenda" width="20" height="20" />
                  <span>Duração mínima de:</span> {expInfoData.duration} dias
               </li>
               <li>
                  <img src="/assets/imgs/icons/icon_pin.svg" alt="Localização" width="15" height="20" />
                  <span>Local da Experiência:</span>{expInfoData.citiesIdcities.name}
               </li>
               {expInfoData.minAge && <>
                  <li>
                     <img src="/assets/imgs/icons/icon_user.svg" alt="Idade mínima" width="18" height="20" />
                     <span>Idade Mínima:</span> {expInfoData.minAge}
                  </li></>}
            </ul>}
         </div>
      </div>
   );
}

export default FeaturesExp;