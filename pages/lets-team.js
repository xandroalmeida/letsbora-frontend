import ImageContainer from '../components/ImageContainer';
import SectionVideo from '../components/SectionVideo';
import PageInterna1 from '../layouts/PageInterna1';

function LetsTeam() {

   return (
      <PageInterna1>
         <section className="quem-somos section">
            <h2 className="text-center">Quem Somos</h2>
            <div className="container">
               <div className="txt-quem-somos">
                  <p>Nós aproximamos pessoas, construímos memórias e escrevemos histórias inesquecíveis. Somos uma plataforma de conteúdo, conexão e experiências pensadas para o perfil de cada viajante. Nós não pretendemos ser uma agência de viagens! Somos uma comunidade que conecta pessoas, lugares e momentos.</p>

                  <p>Promovemos experiências de troca e colaboração entre duas das culturas mais incríveis do mundo, o Brasil e a África do Sul, de maneira única. Construímos essa conexão Através de experiências locais, roteiros personalizados e expedições exclusivas, pois acreditamos que uma viagem pode mudar a sua vida e também a vida de muitas pessoas.</p>
               </div>
               <div className="square-rosa"></div>

               <div className="gallery-imgs">
                  <ul>
                     <li>
                        <ImageContainer src={`/assets/imgs/foto_esquerda.jpg`} alt="Quem Somos 1" />
                     </li>
                     <li>
                        <ImageContainer src={`/assets/imgs/foto_meio.jpg`} alt="Quem Somos 2" />
                     </li>
                     <li>
                        <ImageContainer src={`/assets/imgs/foto_direita.jpg`} alt="Quem Somos 3" />
                     </li>
                  </ul>
               </div>
            </div>
         </section>
         <section className="lets-team">
            <h2 className="text-center">Let's Team</h2>
            <div className="container">
               <div className="col-team">
                  <ImageContainer src="/assets/imgs/Babi_Team_v2.jpg" alt="Babi Braz"/>
                  <h3>Babi Braz</h3>
                  <h5>Co-Founder & Head of Communication</h5>
                  <p>
                     Eu sou a Babi, uma leonina autêntica, feliz e muito comunicativa, que ama aproveitar a vida ao máximo. 
                     Dediquei os últimos 8 anos da minha vida ao Marketing, e tive a honra de fazer parte de grandes empresas, como Adidas, Chilli Beans e Riachuelo.
                  </p>
                  <p>
                     Em 2019 eu decidi fazer a minha primeira viagem para África do Sul, onde tive um encontro comigo mesma. Lá eu percebi que queria fazer mais pelas pessoas, eu queria que todo mundo pudesse viver o que eu vivi: A melhor experiência da minha vida!
                  </p>
               </div>
               <div className="col-team">
                  <ImageContainer src="/assets/imgs/Eliza_Team.jpg" alt="Eliza Castro"/>
                  <h3>Eliza Castro</h3>
                  <h5>Co-Founder & Head of Communication</h5>
                  <p>
                     Eliza aqui! Sou do tipo otimista de carteirinha, sempre vejo o copo meio cheio. Trabalhei por mais de 10 anos como Advogada, até que decidi dar uma reviravolta completa na minha vida e troquei a advocacia pela Arquitetura.
                  </p>
                  <p>
                     Viajante por paixão! Se não estou viajando, estou planejando uma viagem.  Desde que me falaram da África do Sul pela primeira vez, eu soube que lá era o meu lugar no mundo. Me apaixonei pelo país desde o minuto em que cheguei. Hoje, tenho como missão fazer com que outras pessoas se encantem pelo país tanto quanto eu.
                  </p>
               </div>
            </div>
         </section>
         <section className="bg-lets-team">
            <div className="wrapper-video">
               <ImageContainer src="/assets/imgs/imagem_lets_team_v2.jpg" alt="Let's Team" />
            </div>
         </section>
         <section className="parceiros section">
            <h2 className="text-center">Parceiros de negócios</h2>
            <div className="container">
               <ul>
                  <li>
                     <a href="https://www.spireads.com.br" target="_blank">
                        <div className="logo">
                           {/* <ImageContainer src="/assets/imgs/GA_edited.png" alt="Spire Ads" width="114" height="120" /> */}
                           <img src="/assets/imgs/parceiros/GA_edited.png" alt="GA" width="225" />
                        </div>
                        <h3>Spire Ads</h3>
                        Digital Performance
                     </a>
                  </li>
                  <li>
                     <a href="https://pedrokaiser.com" target="_blank">
                        <div className="logo">
                           {/* <ImageContainer src="/assets/imgs/icon_letsbora.svg" alt="Pedro Kaiser" width="114" height="120" /> */}
                           <img src="/assets/imgs/parceiros/PK.png" alt="Parceiro 1" width="225" />
                        </div>
                        <h3>Pedro Kaiser</h3>
                        Branding Strategy
                     </a>
                  </li>
                  <li>
                     <a href="https://mdcode.com.br" target="_blank">
                        <div className="logo">
                           {/* <ImageContainer src="/assets/imgs/icon_letsbora.svg" alt="Mdcode" width="114" height="120" /> */}
                           <img src="/assets/imgs/parceiros/mdcode.png" alt="Mdcode" width="225" />
                        </div>
                        <h3>Mdcode</h3>
                        IT development<br/>& infrastructure
                     </a>
                  </li>
               </ul>
            </div>
         </section>
      </PageInterna1>
   );
}

export default LetsTeam;