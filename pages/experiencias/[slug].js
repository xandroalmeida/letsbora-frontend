import Link from 'next/link';
import Router, { useRouter } from 'next/router';
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
import { redirectPage } from '../../helpers';
import PageInterna1 from '../../layouts/PageInterna1';
import { pathsMenu } from '../../utils/routes';
import { currencyFormat } from '../../utils/utils';
import ImageContainer from "../../components/ImageContainer";

function ExperienciaDetalhe() {

   const [showCalendar, setShowCalendar] = useState(true);
   const [expInfoData, setExpInfoData] = useState(null);
   const [mainGalleryObj, setMainGalleryObj] = useState(null);
   const [mainGallery2Obj, setMainGallery2Obj] = useState(null);
   const [jsonIncludedList, setJsonIncludedList] = useState(null);
   const [jsonNotIncludedList, setJsonNotIncludedList] = useState(null);
   const [jsonRestrictionsList, setJsonRestrictionsList] = useState(null);
   const [arrDaysSchedule, setArrDaysSchedule] = useState(null);
   const [priceData, setPriceData] = useState(null);
   const [showFeedback, setShowFeedback] = useState(false);
   const [width, setWidth] = useState(0);

   const [loading, setLoading] = useState(false);

   const router = useRouter()
   // console.log('router.query', router.query);
   // console.log('router.query', router);
   const { slug } = router.query;
   redirectPage(slug);


   useEffect(() => {

      window.addEventListener('resize', checkSizeViewport());

      return () => {
         window.removeEventListener('resize', checkSizeViewport());
      };
   }, []);

   useEffect(() => {
      if (slug) {
         fetchExperiencia();
         setMainGalleryObj(null);
         setMainGallery2Obj(null);
         window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
         });
      }
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

   function checkSizeViewport() {
      setWidth(window.screen.width);
   }

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

   function showCalendarChooseDate(stt) {
      //Vamos Sempre mostrar o caelndario de agendamento e compra ;-)
      /*
      if (stt) {
         setShowCalendar(true);
         return;
      }
      setShowCalendar(false);
      */
   }

//<iframe width="560" height="315" src="https://www.youtube.com/embed/sQPXvtJQ9p4?controls=0&autoplay=1&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   return (
      <PageInterna1
         title="O que fazer na África do Sul | Let’s Bora"
         description="Aproximando pessoas e proporcionando experiências inesquecíveis. O Let’s Bora traz dicas de quais são as melhores experiências para você curtir a África do Sul."
         >
         {loading && <div className="load-full-page"><Loading /></div>}
         {expInfoData &&
            <>
               <section className="body-interna content-experiencia-detalhe">
                  <div className="header-experiencia-detalhe">
                     <div className="container">
                        <div className="row">
                           <h1 className="nome-experiencia">
                              {expInfoData.name}
                           </h1>
                           <a href="#comprar-agora" className="box-price">
                              <div className="txt-comprar-agora">
                                 comprar agora
                              </div>
                              <div className="box-promo">
                                 R$ {expInfoData.priceDefaultAdult}
                              </div>
                              <div className="parcelamento">
                                 3x no cartão de crédito
                              </div>
                           </a>
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
                              <div className="box-price">
                                 {/* <div className="price-slash">
                                 R$ 209
                              </div> */}
                                 <div className="price-sale">
                                    {currencyFormat(expInfoData.priceDefaultAdult)}
                                    <span>3x no cartão de crédito</span>
                                 </div>
                                 <a onClick={() => showCalendarChooseDate(1)}>comprar agora</a>
                              </div>
                           </div>
                        </div>
                     </div>
                     {false && <div className="wrap-content">
                        <div className="gallery-imgs-exp-others">
                           {mainGallery2Obj && mainGallery2Obj.length > 0 && <Carousel items={mainGallery2Obj} totalShow={mainGallery2Obj.length > 3 ? 3 : mainGallery2Obj.length} />}
                           {mainGallery2Obj && mainGallery2Obj.length === 0 && <div className="spacer-fake"></div>}
                        </div>
                     </div>}
                     {priceData && showCalendar && <AgendaComprar expInfoData={expInfoData} onCloseAgenda={() => showCalendarChooseDate(0)} priceData={priceData} onAddedToCart={() => onAddedToCart()} />}
                  </div>
                  <div className="schedule-days">
                     <div className="container">
                        <ul>
                           {arrDaysSchedule && arrDaysSchedule.map((item) => {
                              console.log(item);
                              return <li key={`item-${expInfoData.idexperiencias}-${item.thumb}`}>
                                 <ImageContainer src={`/assets/uploads/${expInfoData.idexperiencias}/${item.thumb}`} />
                                 
                                 
                                 {!item.dayLabel && <div className="info-day">
                                    <h3>Como será sua experiencia</h3>
                                    {ReactHtmlParser(item.description)}
                                 </div>}
                                 {item.dayLabel && <div className="info-day">
                                    <h3>{item.dayLabel}</h3>
                                    {ReactHtmlParser(item.description)}
                                 </div>}
                              </li>;
                           })}
                        </ul>

                        {arrDaysSchedule && arrDaysSchedule.length > 2 && <a href="#" className="btn-vazado btn-see-more">ver mais</a>}
                     </div>
                  </div>
                  <div className="all-inclusive">
                     <div className="container">
                        <h3>Confira aqui tudo que faz parte do passeio</h3>
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

export default ExperienciaDetalhe;