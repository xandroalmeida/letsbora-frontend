import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageContainer from '../ImageContainer';
import { pathsMenu } from '../../utils/routes';

function Footer({ customFooter }) {

   return (
      <footer>
         <div className="footer">
            <div className="container">
               <div className="content-footer">
                  <div className="col-esq">
                     <div className="info-empresa">
                        <ImageContainer src="/assets/imgs/logo_letsbora_white.svg" alt="Let's Bora" />
                     </div>
                  </div>
               </div>
               <div className="content-footer">
                  <div className="col-esq">
                     <div className="info-empresa">
                        {!customFooter && <p>Somos uma plataforma de conteúdo, conexão e experiências de viagens, customizadas para o perfil de cada viajante. Não pretendemos ser uma agência de viagens! Somos uma comunidade que conecta pessoas, lugares e momentos.</p>}
                        {customFooter && <h3>{customFooter.title}</h3>}
                        {customFooter && <p>{customFooter.content}</p>}
                        <ul className="hidden-mobile">
                           <li><a href="https://www.facebook.com/letsborabr" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                           <li><a href="https://twitter.com/letsborabr" target="_blank"><i className="fab fa-twitter"></i></a></li>
                           <li><a href="https://www.instagram.com/letsborabr" target="_blank"><i className="fab fa-instagram"></i></a></li>
                           <li><a href="https://www.linkedin.com/company/let-s-bora" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-dir">

                     <ul className="hidden-mobile">
                        <h3>Explore</h3>
                        <li>
                           <Link href={pathsMenu.experiencias}>
                              <a>Experiences</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={pathsMenu.sobre}>
                              <a>Let's Team</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={pathsMenu.blog}>
                              <a>Blog</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={pathsMenu.contato}>
                              <a>Let's Talk</a>
                           </Link>
                        </li>
                     </ul>
                     <ul className="endereco">
                        <h3>Endereço</h3>
                        <li>
                           <div className="icon">
                              <i className="fas fa-map-marker-alt"></i>
                           </div>
                           <p>Rua Gomes de Carvalho, 940 - Vila Olímpia, São Paulo/SP.</p>
                        </li>
                        <li>
                           <div className="icon">
                              <i className="far fa-envelope"></i>
                           </div>
                           <p><a href="mailto:hello@letsborabr.com">hello@letsborabr.com</a></p>
                        </li>
                        <li>
                           <div className="icon">
                              <i className="fas fa-phone-alt"></i>
                           </div>
                           <p><a href="tel:+5511970656786">+55 11 97065 6786</a></p>
                        </li>
                     </ul>
                  </div>
                  <ul className="hidden-desktop list-redes-sociais">
                     <li><a href="https://www.facebook.com/letsborabr" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                     <li><a href="https://twitter.com/letsborabr" target="_blank"><i className="fab fa-twitter"></i></a></li>
                     <li><a href="https://www.instagram.com/letsborabr" target="_blank"><i className="fab fa-instagram"></i></a></li>
                     <li><a href="https://www.linkedin.com/company/let-s-bora" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                  </ul>
               </div>

               <div className="row">
                  <div className="copyright">
                     <div className="txt-copy">
                        <span>BORA INTERCAMBIO E EXPERIENCIAS EM VIAGENS LTDA<br />
                           CNPJ 40.506.881/0001-31</span><br />
                        ©2021 LETS BORA. Todos os direitos reservados.
                     </div>
                     <ul>
                        <li>
                           <Link href={pathsMenu.politica}>
                              <a>Política de Privacidade</a>
                           </Link>
                        </li>
                        <li><a href="#">Termos e Condições</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div className="btn-wpp-fixed">
            <Link href={pathsMenu.wpp}>
               <a target="_blank">
                  <img src="/assets/imgs/icon_whats.png" alt="WhatsApp" width={65} height={65} />
               </a>
            </Link>
         </div>
      </footer>
   );
}

export default Footer;