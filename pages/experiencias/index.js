import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Posts from '../../components/Blog/posts';
import FilterBar from '../../components/FilterBar';
import GridExperiencias from '../../components/GridExperiencias';
import PageInterna1 from '../../layouts/PageInterna1';
import { pathsMenu } from '../../utils/routes';
import { getAllExperiences, getAllExperiencesByPage, searchExperiencesByTerm } from '../../api/connect_api';
import Loading from '../../components/Loading';

function Experiencia() {

   let timerSearchText = null;

   const [posts, setPosts] = useState(null);
   const [experiences, setExperiences] = useState(null);
   const [experiencesBkp, setExperiencesBkp] = useState(null);
   const [page, setPage] = useState(1);
   const [currentTotal, setCurrentTotal] = useState(0);
   const [numTotalPages, setNumTotalPages] = useState(1);
   const [totalItems, setTotalItems] = useState(null);
   const [showMaisFiltros, setShowMaisFiltros] = useState(false);

   const [loading, setLoading] = useState(false);
   const [loadingMore, setLoadingMore] = useState(false);

   useEffect(() => {
      fetchExperiences();
      fetchPosts();
   }, []);

   //consumindo experiencias da api
   async function fetchExperiences() {
      setLoading(true);
      const allExperiences = await getAllExperiences();
      if (allExperiences.data['hydra:member']) {
         const arrAllExperiences = [...allExperiences.data['hydra:member']];
         setExperiencesBkp(arrAllExperiences);
         const totalItems = allExperiences.data['hydra:totalItems'];
         setTotalItems(totalItems);
         const totalPages = Math.ceil(totalItems / 12);
         setNumTotalPages(totalPages)
         const randomExp = shuffleArray(arrAllExperiences);
         //get first 12
         const first12Items = getNext12Items(randomExp, currentTotal);
         setExperiences([...first12Items]);
      }
      // console.log(allExperiences.data.length);
      setLoading(false);
   }

   function getNext12Items(arr, currentTotal) {
      const toState = [];
      const newTotal = currentTotal + 12;
      for (let index = currentTotal; index < newTotal; index++) {
         const element = arr[index];
         if (!element) {
            continue;
         }
         toState.push(element);
      }

      setCurrentTotal(newTotal);
      return toState;
   }


   function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
   }

   //consumindo posts do blog em wordpress, blog.lestsborabr.com
   async function fetchPosts() {
      const resp = await axios.get('https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=3')
      if (resp.data) {
         setPosts([...resp.data]);
      }
   }

   async function fetchMorePosts() {
      setLoadingMore(true);
      const newPage = page + 1;

      const next12Items = getNext12Items(experiencesBkp, currentTotal);
      const oldArrayExperiencias = [...experiences];
      for (let index = 0; index < next12Items.length; index++) {
         const newElement = next12Items[index];
         oldArrayExperiencias.push(newElement);
      }
      setExperiences(oldArrayExperiencias);
      setPage(newPage);

      setLoadingMore(false);
   }

   function setTimerSearchText(e) {
      const value = e.currentTarget.value;
      console.log('value', value);
      clearInterval(timerSearchText);
      timerSearchText = setInterval(() => {
         clearInterval(timerSearchText);
         fetchExperiencesByTerm(value);
      }, 1000);
   }

   async function fetchExperiencesByTerm(value) {
      setLoading(true);
      const obj = {
         term: value
      };
      const allExperiences = await searchExperiencesByTerm(obj);
      if (allExperiences.data['experiences']) {
         const arrAllExperiences = [...allExperiences.data['experiences']];
         setExperiencesBkp(arrAllExperiences);
         const totalItems = allExperiences.data['experiences'].length;
         setTotalItems(totalItems);
         const totalPages = Math.ceil(totalItems / 12);
         setNumTotalPages(totalPages)
         const randomExp = shuffleArray(arrAllExperiences);
         setPage(1);
         setCurrentTotal(0);
         //get first 12
         console.log('randomExp', randomExp);
         const first12Items = getNext12Items(randomExp, 0);
         console.log('first12Items', first12Items);
         setExperiences([...first12Items]);
      }
      // console.log(allExperiences.data.length);
      setLoading(false);
   }

   function cleanSearchTerm() {
      const inputSearch = document.querySelector('input[name="search"]');
      inputSearch.value = "";
      fetchExperiences();
   }

   return (
      <PageInterna1
         title="O que fazer na África do Sul | Let’s Bora"
         description="Aproximando pessoas e proporcionando experiências inesquecíveis. O Let’s Bora traz dicas de quais são as melhores experiências para você curtir a África do Sul."
         >
         <section className="body-interna experiencias">
            <div class="container">
               <h1>O que fazer na África do Sul?</h1>
               <p class="linhaFina">Está com dúvidas sobre o seu roteiro de viagem para à África do Sul? Com a Let’s Bora, você tem acesso a experiências exclusivas, customizadas para o seu estilo de vida e com aquela pitada de emoção e verdade. Passeios gastronômicos, eventos cheios de adrenalina e até voos de helicóptero. Escolha os seus e faça parte da cultura sul-africana.</p>
               <h2>Encontre aqui a sua experiência</h2>
               <div className="search-text">
                  <input type="text" name="search" placeholder="O QUE VOCÊ PROCURA?" onChange={setTimerSearchText} />
                  <div className="actions">
                     <div className="btn-close" onClick={() => cleanSearchTerm()}>
                        <i className="fas fa-times"></i>
                     </div>
                  </div>
                  <div className="filter-advanced" onClick={() => setShowMaisFiltros(!showMaisFiltros)}>
                     <i className="fas fa-sliders-h"></i> Ver mais filtros
                  </div>
               </div>
               <div className="row-height-notequal">
                  <div className={`col-esq-bar ${showMaisFiltros ? '' : 'hide-column'}`}>
                     <FilterBar />
                     <Link href={pathsMenu.intercambio}>
                        <a className="box-fazer-intercambio">
                           <span>Quero fazer<br />intercâmbio</span>
                           <div className="bg-image"></div>
                        </a>
                     </Link>
                     <Link href={pathsMenu.voluntario}>
                        <a className="box-ser-voluntario">
                           <span>Quero ser<br />voluntário</span>
                           <div className="bg-image"></div>
                        </a>
                     </Link>
                  </div>
                  <div className={`content-filtered ${showMaisFiltros ? 'open' : ''}`}>
                     {/* <div className="banner-publicidade">
                        BANNER DE ANUNCIO DIRECIONADO
                     </div> */}

                     {loading && <Loading />}
                     {experiences && experiences.length === 0 && <div className="none_exp_found">Nenhuma experiência encontrada</div>}

                     {experiences && <GridExperiencias data={experiences} start={0} end={1} />}

                     <Link href={pathsMenu.expPersonalizar}>
                        <div className="btn-vazado btn-personalize">clique aqui e personalize a sua experiência de viagem!</div>
                     </Link>

                     <div className="container-blog">
                        <h3 className="title-blog">Descubra mais sobre a África do Sul</h3>
                        <div className="wrapper-blog">
                           <Posts data={posts} totalShow={3} />
                        </div>
                     </div>

                     {experiences && experiences.length > 6 && <GridExperiencias data={experiences} start={2} end={3} />}

                     <div className="container-blog">
                        <h3 className="title-blog">Tudo para a sua viagem</h3>
                        <div className="wrapper-blog row-tudo-viagem">
                           <div className="item-post">
                              <Link href={pathsMenu.intercambio}>
                                 <img src="https://letsborafrontend.s3.amazonaws.com/assets/imgs/quero_fazer_intercambio.jpg" alt="Intercâmbio" />
                              </Link>
                              <h3>Quero fazer intercâmbio</h3>
                              <Link href={pathsMenu.intercambio}>SAIBA MAIS</Link>
                           </div>
                           <div className="item-post">
                              <Link href={pathsMenu.intercambio}>
                                 <img src="https://letsborafrontend.s3.amazonaws.com/assets/imgs/quero_ser_voluntario.jpg" alt="Intercâmbio" />
                              </Link>
                              <h3>Quero ser voluntário</h3>
                              <Link href={pathsMenu.voluntario}>SAIBA MAIS</Link>
                           </div>
                           <div className="item-post">
                              <Link href={`https://api.whatsapp.com/send?phone=553175234402&text=Ol%C3%A1%20Milhas%20Trip!%20Sou%20cliente%20Let's%20Bora%20e%20gostaria%20de%20maiores%20informa%C3%A7%C3%B5es%20sobre%20passagens%20a%C3%A9reas%20internacionais.%20Pode%20me%20ajudar%3F`}>
                                 <a target="_blank" class="link">
                                    <img src="https://letsborafrontend.s3.amazonaws.com/assets/imgs/milhas_trip.jpg" alt="Intercâmbio" />
                                 </a>
                              </Link>
                              <h3>Passagem aérea</h3>
                              <Link href={`https://api.whatsapp.com/send?phone=553175234402&text=Ol%C3%A1%20Milhas%20Trip!%20Sou%20cliente%20Let's%20Bora%20e%20gostaria%20de%20maiores%20informa%C3%A7%C3%B5es%20sobre%20passagens%20a%C3%A9reas%20internacionais.%20Pode%20me%20ajudar%3F`}>
                                 <a target="_blank">SAIBA MAIS</a>
                              </Link>
                           </div>
                        </div>
                     </div>

                     {experiences && experiences.length > 6 && <GridExperiencias data={experiences} start={4} end={99} />}

                     {loadingMore && <Loading width={60} />}
                     {numTotalPages > page && experiences && experiences.length >= 12 && <a onClick={() => fetchMorePosts()} className="btn-vazado btn-more">ver mais experiências</a>}
                  </div>
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

export default Experiencia;