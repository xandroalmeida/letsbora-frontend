import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTwoExperiences } from '../../api/connect_api';
import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PostItem from '../../components/PostItem';
import ExperienceItem from '../../components/ExperienceItem';
import PageInterna1 from '../../layouts/PageInterna1';
import { checkLogin, logoutAction } from '../../utils/auth';
import { pathsMenu } from '../../utils/routes';

function MinhaConta() {

   const [posts, setPosts] = useState(null);
   const [experiences, setExperiences] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(null);

   useEffect(() => {
      fetchPosts();
      checkIsLogged();
   }, []);

   async function checkIsLogged() {
      const loggedIn = await checkLogin();
      setIsLoggedIn(loggedIn);
   }

   //consumindo posts do blog em wordpress, blog.lestsborabr.com
   async function fetchPosts() {
      const resp = await axios.get('https://blog.letsborabr.com/wp-json/wp/v2/posts?per_page=2')
      if (resp.data) {
         setPosts([...resp.data]);
      }

      const respTwoExperiences = await getTwoExperiences();
      if (respTwoExperiences.data) {
         setExperiences([...respTwoExperiences.data.experiences]);
      }
   }

   return (
      <PageInterna1>
         <section className="minha-conta section section-gray">
            <div className="container">
               <Link href={pathsMenu.expPersonalizar}>
                  <a className="btn-personalize">
                     clique aqui e personalize a sua experência de viagem!
                  </a>
               </Link>

               <h2 className="title text-center">
                  Minha Conta {isLoggedIn && <a><small className="btn-logout" onClick={()=>logoutAction()}>(Sair <i className="fas fa-sign-out-alt"></i>)</small></a>}
               </h2>

               
               <MenuMinhaConta />
            </div>

            <div className="container">
               <div className="info-adicional">
                  <div className="add-info-blog">
                     <h3 className="text-center text-white">Blog</h3>
                     <div className="container-rosa">
                        {posts && <PostItem posts={posts} hasDescription={1} />}
                     </div>
                  </div>
                  <div className="add-info-experiencias">
                     <h3 className="text-center text-white">Experiências para você</h3>
                     <div className="container-rosa">
                        {experiences && <ExperienceItem experiences={experiences} hasDescription={1} />}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

export async function getServerSideProps({ req, res }) {
   const authInfo = req.cookies.letsboraauthinfo ? req.cookies.letsboraauthinfo : null;

   if(!authInfo || authInfo.length === 0) //se nao existeir nenhuma informação de login, mando o user fazer o login
   {
      res.statusCode = 307;
      res.setHeader('Location', `${pathsMenu.login}?path=minha-conta`);
      return {props: {}};
   }

   return {
      props: {
         initialUserValue: authInfo
      }
   }
}

export default MinhaConta;