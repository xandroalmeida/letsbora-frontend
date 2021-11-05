import { useEffect, useState } from "react";
import config from "../../config";
import Loading from '../Loading';
import {searchExperiences} from '../../api/connect_api';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { pathsMenu } from "../../utils/routes";

function FilterBar({onNewSearch}) {

   const [width, setWidth] = useState(0);
   const [open, setOpen] = useState(false);
   const [error, setError] = useState(null);
   const [errorNone, setErrorNone] = useState(null);
   const [loading, setLoading] = useState(null);

   const [arrChecked, setChecked] = useState([]);
   const [arrCheckedCidades, setCheckedCidades] = useState([]);
   const [arrCheckedBudget, setCheckedBudget] = useState([]);
   
   useEffect(() => {
      window.addEventListener('resize', checkSizeViewport());

      return () => {
         window.removeEventListener('resize', checkSizeViewport());
      };
   }, []);

   function checkSizeViewport() {
      setWidth(window.screen.width);
   }

   function handleOpenCloseFilter() {
      setOpen(!open);
   }

   function setEstilos(element) {
      setChecked((prevState) => {
         const newState = [...prevState];

         if(!element.checked && newState.indexOf(element.value) >= 0) {
            newState.splice(newState.indexOf(element.value), 1);
         }
         else if(element.checked) {
            newState.push(element.value);
         }

         return newState;
      });
   }

   function setCidades(element) {
      setCheckedCidades((prevState) => {
         const newState = [...prevState];

         if(!element.checked && newState.indexOf(element.value) >= 0) {
            newState.splice(newState.indexOf(element.value), 1);
         }
         else if(element.checked) {
            newState.push(element.value);
         }

         return newState;
      });
   }

   function setBudget(element) {
      setCheckedBudget((prevState) => {
         const newState = [...prevState];

         if(!element.checked && newState.indexOf(element.value) >= 0) {
            newState.splice(newState.indexOf(element.value), 1);
         }
         else if(element.checked) {
            newState.push(element.value);
         }

         return newState;
      });
   }

   async function onSubmit() {
      setError(false);
      setErrorNone(false);
      if(arrChecked.length === 0 && arrCheckedBudget.length === 0 && arrCheckedCidades.length === 0)
      {
         setError(true);
         return;
      }

      setLoading(true);
      const objToSearch = {
         estilo: arrChecked,
         onde: arrCheckedCidades,
         budget: arrCheckedBudget
      }

      const respSearch = await searchExperiences(objToSearch);
      if(!respSearch.data || respSearch.data.experiences.length === 0)
      {
         setErrorNone(true);
         setLoading(false);
         return;
      }

      const objToSave = {
         filters: objToSearch,
         experiences: respSearch.data.experiences
      }

      setLoading(false);
      setOpen(false);
      // console.log('objToSave', objToSave);
      // console.log('objToSave', JSON.stringify(objToSave));
      localStorage.setItem(config.cookieSearch, JSON.stringify(objToSave))
      if(typeof onNewSearch === 'function')
      {
         onNewSearch(objToSave)
         return;
      }
      
      Router.push(pathsMenu.search);
   }

   let contadorEstilo = 0;
   let contadorCidade = 0;

   return (
      <div className={`box-filter ${open ? 'open' : ''}`}>
         <div className="wrap-filter">

            {width > 768 && <div className="title-filter">
               <i className="fas fa-sliders-h"></i> Filtro
            </div>}

            {width < 767 && <div className="title-filter" onClick={() => handleOpenCloseFilter()}>
               <i className="fas fa-sliders-h"></i> Filtro
                  {open && <div className="btn-close">
                  <i className="fas fa-times"></i>
               </div>}
            </div>}

            <div className="contents-filters">

               <div className="content-filter">
                  <h4>estilo</h4>

                  <ul className="list-filters list-colunas">
                     {config.arrEstilos && config.arrEstilos.map((item)=>{
                        contadorEstilo ++;
                        return(
                           <li key={`estilo-${contadorEstilo}`}>
                              <label className="container-checkbox">
                                 {item}
                                 <input type="checkbox" value={item} onChange={(event) => setEstilos(event.target)} />
                                 <span className="checkmark"></span>
                              </label>
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="content-filter">
                  <h4>onde?</h4>

                  <ul className="list-filters list-colunas">
                     {config.arrCidades && config.arrCidades.map((item)=>{
                        contadorCidade ++;
                        return (
                           <li key={`cidade-${contadorCidade}`}>
                              <label className="container-checkbox">
                                 {item}
                                 <input type="checkbox" value={item} onChange={(event) => setCidades(event.target)} />
                                 <span className="checkmark"></span>
                              </label>
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="content-filter">
                  <h4>budget</h4>

                  <ul className="list-filters list-colunas">
                     <li>
                        <label className="container-checkbox">
                           Econômico
                           <input type="checkbox" value={'Econômico'} onChange={(event) => setBudget(event.target)} />
                           <span className="checkmark"></span>
                        </label>
                     </li>
                     <li>
                        <label className="container-checkbox">
                           Conforto
                           <input type="checkbox" value={'Conforto'} onChange={(event) => setBudget(event.target)} />
                           <span className="checkmark"></span>
                        </label>
                     </li>
                     <li>
                        <label className="container-checkbox">
                           Luxo
                           <input type="checkbox" value={'Luxo'} onChange={(event) => setBudget(event.target)} />
                           <span className="checkmark"></span>
                        </label>
                     </li>
                  </ul>
               </div>
               
               {loading && <Loading width={40}  />}
               <a onClick={()=>onSubmit()} className="btn-search">buscar</a>
               {error && <span className="error-warning">Por favor selecione ao menos 1 filtro para buscar.</span>}
               {errorNone && <span className="error-warning">Desculpe, nenhuma experiência foi encontrada. Refaça os filtros e procure novamente.</span>}
            </div>

         </div>
      </div>
   );
}

export default FilterBar;