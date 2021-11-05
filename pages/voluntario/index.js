import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import { getAllExperiencesBySlug, getDaysSchedule, getPrecosExperiences } from '../../api/connect_api';
import AgendaComprar from '../../components/AgendaComprar';
import Carousel from '../../components/Carousel';
import CarouselExperiencia from '../../components/CarouselExperiencia';
import ExperienciasRelacionadas from '../../components/ExperienciasRelacionadas';
import FeaturesExp from '../../components/FeaturesExp';
import Loading from '../../components/Loading';
import config from '../../config';
import PageInterna1 from '../../layouts/PageInterna1';
import { pathsMenu } from '../../utils/routes';

function Voluntario() {

   const [showCalendar, setShowCalendar] = useState(null);
   const [expInfoData, setExpInfoData] = useState(null);
   const [mainGalleryObj, setMainGalleryObj] = useState(null);
   const [mainGallery2Obj, setMainGallery2Obj] = useState(null);
   const [jsonIncludedList, setJsonIncludedList] = useState(null);
   const [jsonNotIncludedList, setJsonNotIncludedList] = useState(null);
   const [jsonRestrictionsList, setJsonRestrictionsList] = useState(null);
   const [arrDaysSchedule, setArrDaysSchedule] = useState(null);
   const [priceData, setPriceData] = useState(null);
   const [showFeedback, setShowFeedback] = useState(false);

   const [loading, setLoading] = useState(false);

   const slug = 'voluntario';

   useEffect(() => {
      slug && fetchExperiencia();
   }, [slug]);

   useEffect(() => {
      if (showFeedback) {
         const interval = setInterval(() => {
            console.log('interval passou');
            setShowFeedback(false);
         }, 8000);
         return () => clearInterval(interval);
      }
   }, [showFeedback]);

   async function fetchExperiencia() {
      setLoading(true);
      const experience = await getAllExperiencesBySlug(slug);
      console.log('experience', experience);
      setExpInfoData(experience.data);
      organizeImagesMainGallery(experience.data);
      mountItemsList(experience.data);
      fetchDaysSchedule(experience.data);
      const prices = await getPrecosExperiences(experience.data.idexperiencias);
      setPriceData(prices.data.prices);
      setLoading(false);
   }

   async function fetchDaysSchedule(obj) {
      const arrDaysScheduleTemp = await getDaysSchedule(obj.idexperiencias);

      setArrDaysSchedule(arrDaysScheduleTemp.data.days);
      // console.log('arrDaysScheduleTemp', arrDaysScheduleTemp);
   }

   function organizeImagesMainGallery(obj) {
      if (obj && obj.mediasIdmedias) {
         const mainGalleryObjTemp = obj.mediasIdmedias.map((item) => {
            if (item.type === "gallery-image") {
               return {
                  thumb: item.path,
                  name: obj.name
               }
            }

            return null;
         });

         const filterMainGalleryObj = mainGalleryObjTemp.filter(function (el) {
            return el != null;
         });
         setMainGalleryObj(filterMainGalleryObj);

         const mainGallery2Obj = obj.mediasIdmedias.map((item) => {
            if (item.type === "gallery-image2") {
               return {
                  thumb: item.path,
                  name: obj.name
               }
            }

            return null;
         });

         const filterMainGallery2Obj = mainGallery2Obj.filter(function (el) {
            return el != null;
         });
         // console.log('mainGallery2Obj', filterMainGallery2Obj);
         setMainGallery2Obj(filterMainGallery2Obj);
      }
   }

   function mountItemsList(obj) {
      const jsonIncluded = JSON.parse(obj.included);
      const jsonNotIncluded = JSON.parse(obj.notIncluded);
      const jsonRestrictions = JSON.parse(obj.restrictions);

      if (jsonIncluded) {
         const arrIncluded = jsonIncluded.map((included, index) => {
            return (
               <div key={`included-${index}`}>{included}</div>
            );
         });
         setJsonIncludedList(arrIncluded);
      }

      if (jsonNotIncluded) {
         const arrNotIncluded = jsonNotIncluded.map((notIncluded, index) => {
            return (
               <div key={`notIncluded-${index}`}>{notIncluded}</div>
            );
         });
         setJsonNotIncludedList(arrNotIncluded);
      }

      if (jsonRestrictions) {
         const arrRestrictions = jsonRestrictions.map((restriction, index) => {
            return (
               <div key={`restriction-${index}`}>{restriction}</div>
            );
         });
         setJsonRestrictionsList(arrRestrictions);
      }
   }

   function onAddedToCart() {
      setShowFeedback(true);
   }

   return (
      <PageInterna1>
         {loading && <div className="load-full-page"><Loading /></div>}
         {expInfoData &&
            <>
               <section className="body-interna content-experiencia-detalhe page-intercambio-voluntario">
                  <div className="header-experiencia-detalhe">
                     <div className="container">
                        <div className="row">
                           <h1 className="nome-experiencia">
                              {expInfoData.name}
                           </h1>
                           <div className="box-price">
                              <Link href={pathsMenu.wpp2}>
                                 <a className="btn-fale-conosco" target="_blank">
                                    fale com o nosso time
                                 </a>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="gallery-experiencias">
                     {mainGalleryObj && <CarouselExperiencia items={mainGalleryObj} totalShow={mainGalleryObj.length} />}
                  </div>
                  <FeaturesExp 
                     expInfoData={expInfoData}
                     jsonRestrictionsList={jsonRestrictionsList}
                     jsonIncludedList={jsonIncludedList}
                     jsonNotIncludedList={jsonNotIncludedList} />
                  <div id="comprar-agora" className="adicional-experiencia">
                     <div className="container">
                        <div className="row">
                           <div className="col-md-6">
                              <h2>{expInfoData.name}</h2>
                              <p>{expInfoData.shortdesc}</p>
                           </div>
                           <div className="col-md-6">
                              <div className="box-price box-fale-conosco">
                                 <div className="call-to-action">
                                    Vamos falar!
                                 </div>
                                 <Link href={pathsMenu.contato}>
                                    <a>quero ser voluntário</a>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                     {!showCalendar && <div className="wrap-content">
                        <div className="gallery-imgs-exp-others">
                           {mainGallery2Obj && mainGallery2Obj.length > 0 && <Carousel items={mainGallery2Obj} totalShow={mainGallery2Obj.length > 3 ? 3 : mainGallery2Obj.length} />}
                           {mainGallery2Obj && mainGallery2Obj.length === 0 && <div className="spacer-fake"></div>}
                        </div>
                     </div>}
                     {priceData && showCalendar && <AgendaComprar expInfoData={expInfoData} onCloseAgenda={() => setShowCalendar(false)} priceData={priceData} onAddedToCart={() => onAddedToCart()} />}
                  </div>
                  <div className="schedule-days">
                     <div className="container">
                        <ul>
                           {arrDaysSchedule && arrDaysSchedule.map((item, index) => {
                              console.log('item', item);
                              return <li key={`item-${expInfoData.idexperiencias}-${index}`}>
                                 {item.thumb && <img src={`${config.urlS3}assets/uploads/${expInfoData.idexperiencias}/${item.thumb}`} alt={`Dia ${item.day}`} />}
                                 {!item.dayLabel && <div className="info-day">
                                    <h3>Dia {item.day}</h3>
                                    {ReactHtmlParser(item.description)}
                                 </div>}
                                 {item.dayLabel && <div className="info-day">
                                    <h3>{item.dayLabel}</h3>
                                    {ReactHtmlParser(item.description)}
                                 
                                 {item.price && <div className="price-day">{item.price}</div>}
                                 </div>}
                              </li>;
                           })}
                        </ul>

                        <Link href={pathsMenu.wpp2}>
                           <a className="btn-vazado btn-see-more btn-see-more-voluntario" target="_blank">personalize sua experiência de voluntário</a>
                        </Link>
                     </div>
                  </div>
                  <div className="all-inclusive">
                     <div className="container">
                        <h3>Confira aqui tudo que faz parte do pacote</h3>
                        {ReactHtmlParser(expInfoData.description)}
                     </div>
                  </div>
                  <ExperienciasRelacionadas idExp={expInfoData.idexperiencias} />
               </section>
               <div className={`feedback-carrinho ${showFeedback ? 'show' : ''}`}>
                  <div className="info-feeback">
                     <i className="fas fa-cart-plus"></i> Experiência adicionada ao carrinho!
                  </div>
                  <Link href={pathsMenu.carrinho}>
                     <a className="btn-personalize">Ver carrinho</a>
                  </Link>
               </div>
            </>
         }
      </PageInterna1>
   );
}

export default Voluntario;