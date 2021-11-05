import { useEffect, useState } from "react";

function EscolhaInteresses({ filtersExperiences, onChangedInteresses }) {

   console.log('filtersExperiences', filtersExperiences);

   const [arrChoiceInteresses, setArrChoiceInteresses] = useState([]);
   const [arrElements, setArrElements] = useState(null);

   useEffect(()=>{
      if(filtersExperiences && !arrElements)
      {
         renderItemsInteresse();
      }
   },[filtersExperiences])

   function renderItemsInteresse() {
      let contador = 0;
      const arrToSaveState = [];
      const arrElements = filtersExperiences.map((item)=>{
         contador ++;
         arrToSaveState[contador] = item[0];
         return (
            <div key={`filters-${contador}`} className="content-interesses">
               <ul className="list-opt1">
                  <li>{item[0]}</li>
               </ul>
               <ul className="list-switchs">
                  <li>
                     <label className="switch">
                        <input type="checkbox" data-group={contador} data-value1={item[0]} data-value2={item[1]} onChange={(event)=>onChangeInteresse(event.target)} />
                        <span className="slider round"></span>
                     </label>
                  </li>
               </ul>
               <ul className="list-opt2">
                  <li>{item[1]}</li>
               </ul>
            </div>
         );
      });

      setArrElements(arrElements);
      setArrChoiceInteresses(arrToSaveState);
      onChangedInteresses(arrToSaveState);
   }

   function onChangeInteresse(element) {
      console.log('element', element);
      console.log('data-value2', element.getAttribute("data-value1"));
      const checked = element.checked;
      const groupId = element.getAttribute("data-group");
      let value = '';
      if(checked) {
         value = element.getAttribute("data-value2");
      }
      else {
         value = element.getAttribute("data-value1");
      }

      console.log('value', value);
      saveItemChoice(value, groupId);
   }

   function saveItemChoice(value, groupId) {
      setArrChoiceInteresses((prevState) => {
         const newState = [...prevState];
         newState[groupId] = value;
         console.log('newState', newState);

         onChangedInteresses(newState);
         return newState;
      });
   }

   return (
      <div className="estilo">
         <h4>O que te interessa mais?</h4>

         {arrElements}
      </div>
   );
}

export default EscolhaInteresses;