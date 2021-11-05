import { useEffect } from "react";
import PageInterna1 from "../layouts/PageInterna1";

function PoliticaPrivacidade() {

   useEffect(()=>{
      window.scrollTo(0, 0)
   }, []);

   return (
      <PageInterna1>
         <section className="section politica-privacidade">
            <h2 className="text-center">Política de privacidade</h2>
            <div className="container">
               <div className="boxitem">
                  <h3>1. O QUE FAZEMOS COM AS SUAS INFORMAÇÕES?</h3>
                  <p>Quando você realiza alguma transação com nossa loja, como parte do processo de compra e venda, coletamos as informações pessoais que você nos dá tais como: nome, e-mail e endereço.</p>
                  <p>Quando você acessa nosso site, também recebemos automaticamente o protocolo de internet do seu computador, endereço de IP, a fim de obter informações que nos ajudam a aprender sobre seu navegador e sistema operacional.</p>
                  <p>E-mail Marketing será realizado apenas caso você permita. Nestes e-mails você poderá receber notícias sobre nossa loja, novos produtos e outras atualizações.</p>
               </div>

               <div className="boxitem">
                  <h3>2. CONSENTIMENTO</h3>
                  <h4>Como vocês obtêm meu consentimento?</h4>
                  <p>Quando você fornece informações pessoais como nome, telefone e endereço, para completar: uma transação, verificar seu cartão de crédito, fazer um pedido, providenciar uma entrega ou retornar uma compra. Após a realização de ações entendemos que você está de acordo com a coleta de dados para serem utilizados pela nossa empresa. Se pedimos por suas informações pessoais por uma razão secundária, como marketing, vamos lhe pedir diretamente por seu consentimento, ou lhe fornecer a oportunidade de dizer não.</p>
                  <h4>E caso você queira retirar seu consentimento, como proceder?</h4>
                  <p>Se após você fornecer seus dados, você mudar de ideia, você pode retirar o seu consentimento para que possamos entrar em contato, para a coleção de dados contínua, uso ou divulgação de suas informações, a qualquer momento, entrando em contato conosco em hello@letsborabr.com.</p>
               </div>

               <div className="boxitem">
                  <h3>3. DIVULGAÇÃO</h3>
                  <p>Podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.</p>
               </div>

               <div className="boxitem">
                  <h3>4. SERVIÇOS DE TERCEIROS</h3>
                  <p>No geral, os fornecedores terceirizados usados por nós irão apenas coletar, usar e divulgar suas informações na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.</p>
                  <p>Entretanto, certos fornecedores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transação de pagamento, têm suas próprias políticas de privacidade com respeito à informação que somos obrigados a fornecer para eles de suas transações relacionadas com compras.</p>
                  <p>Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender a maneira na qual suas informações pessoais serão usadas por esses fornecedores.</p>
                  <p>Em particular, lembre-se que certos fornecedores podem ser localizados em ou possuir instalações que são localizadas em jurisdições diferentes que você ou nós. Assim, se você quer continuar com uma transação que envolve os serviços de um fornecedor de serviço terceirizado, então suas informações podem tornar-se sujeitas às leis da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas instalações estão localizados. Como um exemplo, se você está localizado no Brasil e sua transação é processada por um gateway de pagamento localizado nos Estados Unidos, então suas informações pessoais usadas para completar aquela transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo o Ato Patriota.</p>
                  <p>Uma vez que você deixe o site da nossa loja ou seja redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço do nosso site.</p>
                  <h4>Links</h4>
                  <p>Quando você clica em links na nossa loja, eles podem lhe direcionar para fora do nosso site. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.</p>
               </div>

               <div className="boxitem">
                  <h3>5. SEGURANÇA</h3>
                  <p>Para proteger suas informações pessoais, tomamos precauções razoáveis e seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.</p>
                  <p>Se você fornecer as suas informações de cartão de crédito, essa informação é criptografada usando tecnologia “secure socket layer” (SSL) e armazenada com uma criptografia Bcrypt. Embora nenhum método de transmissão pela Internet ou armazenamento eletrônico seja 100% seguro, nós seguimos todos os requisitos da PCI-DSS e implementamos padrões adicionais geralmente aceitos pela indústria.</p>
               </div>

               <div className="boxitem">
                  <h3>6. ALTERAÇÕES PARA ESSA POLÍTICA DE PRIVACIDADE</h3>
                  <p>Reservamos o direito de modificar essa política de privacidade a qualquer momento, então por favor, revise-a com frequência. Alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação no site. Se fizermos alterações de materiais para essa política, iremos notificá-lo aqui que eles foram atualizados, para que você tenha ciência sobre quais informações coletamos, como as usamos, e sob que circunstâncias, se alguma, usamos e/ou divulgamos elas. Se nossa loja for adquirida ou fundida com outra empresa, suas informações podem ser transferidas para os novos proprietários para que possamos continuar a vender produtos para você.</p>
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

export default PoliticaPrivacidade;