import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageContainer from '../ImageContainer';
import { pathsMenu } from '../../utils/routes';
import IconCart from '../IconCart';
import { checkLogin, logoutAction } from '../../utils/auth';


function Header(props) {

   const [openMenu, setOpenMenu] = useState(false);
   const [fixedMenu, setFixedMenu] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(null);

   useEffect(() => {
      document.addEventListener('scroll', checkTopHeader);
      checkIsLogged();
   });

   async function checkIsLogged() {
      const loggedIn = await checkLogin();
      setIsLoggedIn(loggedIn);
   }

   function checkTopHeader() {
      // console.log(window.scrollY);
      if (window.scrollY > 10) {
         setFixedMenu(true);
      }
      else {
         setFixedMenu(false);
      }

   }

   return (
      <header>
         <div className={`header ${props.classAdd ? props.classAdd : ''}  ${fixedMenu ? 'header-fixed' : ''}`}>
            <div className="container">
               <div className="icon-menu hidden-desktop" onClick={() => setOpenMenu(true)}>
                  <ImageContainer src="/assets/imgs/icon_menu.svg" alt="Ícone menu" width="39" height="24"></ImageContainer>
               </div>
               <div className="logo-header">
                  <Link href="/">
                     <a>
                        <ImageContainer src="/assets/imgs/logo_letsbora.svg" alt="Let's Bora"></ImageContainer>
                     </a>
                  </Link>
               </div>

               <nav className={`nav-container ${openMenu ? 'open' : ''}`}>
                  <div className="header-nav hidden-desktop">
                     Menu
                     <div className="btn-close" onClick={() => setOpenMenu(false)}><i className="fas fa-times"></i></div>
                  </div>

                  <ul>
                     <li>
                        <Link href={pathsMenu.experiencias}><a>Experiences</a></Link>
                     </li>
                     <li>
                        <Link href={pathsMenu.sobre}>Let's Team</Link>
                     </li>
                     <li>
                        <Link href={pathsMenu.blog}>Blog</Link>
                     </li>
                     <li>
                        <a href={pathsMenu.contato}>Let's Talk</a>
                     </li>

                     <li className="instagram">
                        <a href='https://www.instagram.com/letsborabr' target="_blank">
                           <i className="fab fa-instagram"></i>
                        </a>
                     </li>
                     <li>
                        <IconCart />
                     </li>
                     <li>
                        <Link href={pathsMenu.minhaConta}>
                           <a>
                              <i className="fas fa-user"></i>
                           </a>
                        </Link>
                     </li>
                     {isLoggedIn && <li>
                        <a onClick={() => logoutAction()} title="logout"><i className="fas fa-sign-out-alt"></i></a>
                     </li>}
                  </ul>

               </nav>
            </div>
         </div>
      </header>
   );
}

export default Header;