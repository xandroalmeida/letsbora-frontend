import { useState } from "react";
import config from "../../config";

function EscolhaEstilos({onCheckedEstilos}) {

   const [arrChecked, setChecked] = useState([]);

   function setEstilos(element) {
      
      setChecked((prevState) => {
         const newState = [...prevState];

         if(!element.checked && newState.indexOf(element.value) >= 0) {
            newState.splice(newState.indexOf(element.value), 1);
         }
         else if(element.checked) {
            newState.push(element.value);
         }

         console.log('newState', newState);
         onCheckedEstilos(newState);
         return newState;
      });
   }

   let contador = 0;
   return (
      <ul className="list-estilos">
         {config.arrEstilos && config.arrEstilos.map((estilo)=>{
            contador ++;
            return (
               <li key={`estilo-${contador}`}>
                  <label className="container-checkbox">
                     {estilo}
                     <input type="checkbox" 
                        value={estilo}
                        // onPointerUp={(event) => setEstilos(event.target)}
                        // onPointerDown={(event) => setEstilos(event.target)}
                        onChange={(event) => setEstilos(event.target)} />
                     <span className="checkmark"></span>
                  </label>
               </li>
            );
         })}
      </ul>
   );
}

export default EscolhaEstilos;