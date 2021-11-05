import Link from 'next/link';
import { pathsMenu } from '../../utils/routes';
import ImageContainer from '../ImageContainer';

function SectionLetsGuide() {

   return (
      <section className="section lets-guide">
         <div className="container">
            <div className="row">
               <div className="col-md-6">
                  <ImageContainer src="/assets/imgs/LETS_Sessao-Guias.png" alt="Guia Let's Bora" />
                  <Link href={pathsMenu.guides}>
                     <a className="hidden-desktop">saiba mais</a>
                  </Link>
               </div>
               <div className="col-md-6">
                  <div className="content-guide">
                     <div className="title-guide">
                        <h2>Let's Guide</h2>
                     </div>
                     <p>Curadoria local, roteiros, conteúdos e dicas exclusivas para a sua viagem. Nossos Guias foram cuidadosamente desenvolvidos para garantir que você tenha todas as informações de que precisa  para planejar a melhor viagem da sua vida.</p>
                     <Link href={pathsMenu.guides}>
                        <a className="hidden-mobile">saiba mais</a>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );

}

export default SectionLetsGuide;