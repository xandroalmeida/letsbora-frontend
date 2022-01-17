import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import PostItem from '../../components/PostItem';
import SectionLetsGuide from '../../components/SectionLetsGuide';
import SectionVideo from '../../components/SectionVideo';
import PageInterna1 from '../../layouts/PageInterna1';
import { pathsMenu } from '../../utils/routes';

function Blog() {

   const [posts, setPosts] = useState(null);
   const [loading, setLoading] = useState(false);
   const [loadingMore, setLoadingMore] = useState(false);
   
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      fetchPosts();
   }, []);

   //consumindo posts do blog em wordpress, blog.lestsborabr.com
   async function fetchPosts() {
      setLoading(true);
      const resp = await axios.get(`https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=9&page=${currentPage}`)
      console.log('resp', resp);
      if (resp.data) {
         setTotalPages(resp.headers['x-wp-totalpages']);
         setPosts([...resp.data]);
      }
      setLoading(false);
   }

   async function fetchMorePosts() {
      setLoadingMore(true);
      const newCurrentPage = currentPage + 1;
      const resp = await axios.get(`https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=9&page=${newCurrentPage}`);
      if (resp.data) {
         const newArrPosts = [...posts];
         const arrNewPostsToInclude = [...resp.data];
         for (let index = 0; index < arrNewPostsToInclude.length; index++) {
            const element = arrNewPostsToInclude[index];
            newArrPosts.push(element);
         }
         
         console.log('newArrPosts', newArrPosts);
         setPosts(newArrPosts);
         setCurrentPage(newCurrentPage);
      }
      setLoadingMore(false);
   }
   
   const customFooter = {
      title: "Tudo sobre a África do Sul",
      content: "O que você procura? Safáris? Rotas de vinhos? Praias? Passeios culturais? Museus históricos? Delícias gastronômicas? Com a comunidade Let’s Bora você tem tudo isso! Um roteiro de viagem à África do Sul pode e deve estar cheio de atrativos para você e a sua família curtirem bastante. Um país para se deslumbrar nas quatro estações do ano com todas as suas belezas naturais e curiosidades."
   }

   return (
      <PageInterna1
         title="Blog | Viagem África do Sul | Let’s Bora"
         description=" Aproximando pessoas e proporcionando experiências inesquecíveis. O Let’s Bora traz dicas de quais são as melhores experiências para você curtir a África do Sul."
         customFooter={customFooter}
      >
         
            
         
         <section className="blog-all-posts section">
            <h1 className="text-center">Let’s Blog</h1>
            <p class="linhaFina blog-desc">Você é daqueles que quer saber tudo antes de viajar? O Let’s Blog traz todas as curiosidades, novidades, pontos turísticos e dicas de viagem para a África do Sul. Confira nossos artigos exclusivos e comece a planejar a sua estadia.
            </p>
            <div className="container">
               {loading && <div className="box-loading-posts"><Loading /></div>}
               <div className="list-all-posts">
                  {posts && <PostItem posts={posts} hasDescription={1} />}
               </div>
               {loadingMore && <div className="box-loading-posts"><Loading width={60} /></div>}
               {totalPages && totalPages > 1 && totalPages > currentPage && <a onClick={()=>fetchMorePosts()} className="btn-default btn-more">mais artigos</a>}
            </div>
         </section>
         <SectionVideo />
         <SectionLetsGuide />
         {/* <section className="personalize-blog">
            <div className="container">
               <Link href={pathsMenu.expPersonalizar}>
                  <a className="btn-personalize">
                     clique aqui e personalize a sua experiência de viagem!
                  </a>
               </Link>
            </div> 
         </section>*/}
      </PageInterna1>
   );
}

export default Blog;