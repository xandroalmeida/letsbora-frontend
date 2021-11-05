import Link from 'next/link';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import FilterBar from '../../components/FilterBar';
import GridExperiencias from '../../components/GridExperiencias';
import PageInterna1 from '../../layouts/PageInterna1';
import {pathsMenu} from '../../utils/routes';
import Loading from '../../components/Loading';
import config from '../../config';

function Buscar() {

   const router = useRouter()

   const [experiences, setExperiences] = useState(null);
   const [jsonSearchData, setJsonSearchData] = useState(null);
   
   const [loading, setLoading] = useState(false);

   function newSearch(data) {
      // console.log('data', data);
      setJsonSearchData(data);
      setExperiences(data.experiences);
      window.scrollTo(0, 0)
   }

   useEffect(()=>{
      window.scrollTo(0, 0);

      const localStorage = window.localStorage.getItem(config.cookieSearch) || null;
      if(!localStorage)
      {
         router.push(pathsMenu.experiencias);
      }
      const jsonSearchDataTemp = JSON.parse(localStorage);
      setJsonSearchData(jsonSearchDataTemp);
      setExperiences(jsonSearchDataTemp.experiences)
   },[])

   function renderFiltersUsed(type) {
      const arrReturn = [];
      console.log(jsonSearchData.filters[type]);
      for (let index = 0; index < jsonSearchData.filters[type].length; index++) {
         const element = jsonSearchData.filters[type][index];
         arrReturn.push(<li>- {element}</li>);
      }
      console.log(arrReturn);
      return (
         <div className="box-filter-used">
            <h4>{type}</h4>
            <ul>{arrReturn}</ul>
         </div>
      )
   }

   return (
      <PageInterna1>
         <section className="body-interna">
            <div className="row-height-notequal">
               <div className="col-esq-bar">
                  <FilterBar onNewSearch={(data)=>newSearch(data)} />
                  <Link href={pathsMenu.intercambio}>
                     <a className="box-fazer-intercambio">
                        <span>Quero fazer<br/>intercâmbio</span>
                        <div className="bg-image"></div>
                     </a>
                  </Link>
                  <Link href={pathsMenu.voluntario}>
                     <a className="box-ser-voluntario">
                        <span>Quero ser<br/>voluntário</span>
                        <div className="bg-image"></div>
                     </a>
                  </Link>
               </div>
               <div className="content-filtered open">
                  <div className="container-filter-used">
                     <h3>Filtros utilizados: </h3>
                     <div className="row-filters-used">
                        {jsonSearchData && jsonSearchData.filters && jsonSearchData.filters.estilo.length > 0 && renderFiltersUsed('estilo')}
                        {jsonSearchData && jsonSearchData.filters && jsonSearchData.filters.onde.length > 0 && renderFiltersUsed('onde')}
                        {jsonSearchData && jsonSearchData.filters && jsonSearchData.filters.budget.length > 0 && renderFiltersUsed('budget')}
                     </div>
                  </div>
                  {loading && <Loading />}
                  {experiences && <GridExperiencias data={experiences} start={0} end={1} />}

                  <Link href={pathsMenu.expPersonalizar}>
                    <div className="btn-vazado btn-personalize">clique aqui e personalize a sua experência de viagem!</div>
                  </Link>

                  {experiences && experiences.length > 6 && <GridExperiencias data={experiences} start={2} end={99} />}
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

// export async function getServerSideProps({ req, res }) {
//    const searchData = req.localstorage.letsborasearchdata ? req.localstorage.letsborasearchdata : null;
//    console.log('searchData', searchData);
//    if(!searchData || searchData.length === 0) //se nao existeir nenhuma informação de login, mando o user fazer o login
//    {
//       return {
//          redirect: {
//            destination: `${pathsMenu.experiencias}`,
//            permanent: false,
//          },
//       }
//    }

//    return {
//       props: {
//          searchData
//       }
//    }
// }

export default Buscar;