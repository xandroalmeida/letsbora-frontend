import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import { getAllExperiencesBySlug, getDaysSchedule, getPrecosExperiences } from '../../api/connect_api';
import AgendaComprar from '../../components/AgendaComprar';
import Carousel from '../../components/Carousel';
import CarouselExperiencia from '../../components/CarouselExperiencia';
import ExperienciasRelacionadas from '../../components/ExperienciasRelacionadas';
import Loading from '../../components/Loading';
import config from '../../config';
import PageInterna1 from '../../layouts/PageInterna1';
import { pathsMenu } from '../../utils/routes';

function Guides({experience}) {

   console.log('experienceprops', experience);

   const [showCalendar, setShowCalendar] = useState(null);
   const [expInfoData, setExpInfoData] = useState(experience);
   const [mainGalleryObj, setMainGalleryObj] = useState(null);
   const [mainGallery2Obj, setMainGallery2Obj] = useState(null);
   const [jsonIncludedList, setJsonIncludedList] = useState(null);
   const [jsonNotIncludedList, setJsonNotIncludedList] = useState(null);
   const [jsonRestrictionsList, setJsonRestrictionsList] = useState(null);
   const [arrDaysSchedule, setArrDaysSchedule] = useState(null);
   const [priceData, setPriceData] = useState(null);
   const [showFeedback, setShowFeedback] = useState(false);

   const [loading, setLoading] = useState(false);

   const slug = 'guias-de-viagem';

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
         const arrIncluded = jsonIncluded.map((included) => {
            return (
               <div>{included}</div>
            );
         });
         setJsonIncludedList(arrIncluded);
      }

      if (jsonNotIncluded) {
         const arrNotIncluded = jsonNotIncluded.map((notIncluded) => {
            return (
               <div>{notIncluded}</div>
            );
         });
         setJsonNotIncludedList(arrNotIncluded);
      }

      if (jsonRestrictions) {
         const arrRestrictions = jsonRestrictions.map((restriction) => {
            return (
               <div>{restriction}</div>
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
                              <Link href={pathsMenu.contato}>
                                 <a className="btn-fale-conosco">
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
                  {/* <div className="info-adicional">
                     <div className="container">
                        <ul>
                           <li>
                              <img src="/assets/imgs/icons/icon_agenda.svg" alt="Agenda" width="20" height="20" />
                              <span>Duração mínima de:</span> {expInfoData.duration} dias
                           </li>
                           <li>
                              <img src="/assets/imgs/icons/icon_pin.svg" alt="Localização" width="15" height="20" />
                              <span>Local da Experiência:</span>{expInfoData.citiesIdcities.name}
                           </li>
                           <li>
                              <img src="/assets/imgs/icons/icon_check.svg" alt="Inclui" width="20" height="20" />
                              <span>O que inclui:</span> {jsonIncludedList}
                           </li>
                           <li>
                              <img src="/assets/imgs/icons/icon_minus.svg" alt="Não Inclui" width="20" height="20" />
                              <span>O que não inclui:</span> {jsonNotIncludedList}</li>
                           {expInfoData.minAge && <>
                              <li>
                                 <img src="/assets/imgs/icons/icon_user.svg" alt="Idade mínima" width="18" height="20" />
                                 <span>Idade Mínima:</span> {expInfoData.minAge}
                              </li></>}
                           <li>
                              <img src="/assets/imgs/icons/icon_close.svg" alt="Restrições" width="20" height="20" />
                              <span>Restrições:</span> {jsonRestrictionsList}
                           </li>
                        </ul>
                     </div>
                  </div> */}
                  <div id="comprar-agora" className="adicional-experiencia">
                     <div className="container">
                        <div className="row">
                           <div className="col-md-6">
                              <h2>{expInfoData.name}</h2>
                              <p>{expInfoData.shortdesc}</p>
                           </div>
                           <div className="col-md-6">
                           </div>
                        </div>
                     </div>
                     {!showCalendar && <div className="wrap-content">
                        <div className="gallery-imgs-exp-others-guides">
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

                        <Link href={pathsMenu.contato}>
                           <a className="btn-vazado btn-see-more">fale com o nosso time</a>
                        </Link>
                     </div>
                  </div>
                  <div className="all-inclusive">
                     <div className="container">
                        <h3>Ainda planejando?</h3>
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

export default Guides;