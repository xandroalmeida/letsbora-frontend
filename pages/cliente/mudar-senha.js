import MenuMinhaConta from '../../components/MinhaConta/MenuMinhaConta';
import PageInterna1 from '../../layouts/PageInterna1';

function EsqueceuSenha() {

   return (
      <PageInterna1>
         <section className="minha-conta section section-gray">
            <div className="container">
               <h2 className="title text-center">Mudar a senha?</h2>
               
               <div className="form-esqueceu">
                  <h3 className="subtitle text-center">Digite sua nova senha abaixo</h3>
                  <form action="#" className="template-form">
                     <div className="box-field">
                        <label htmlFor="name">Nova senha</label>
                        <input type="password" name="senha" />
                     </div>
                     <div className="box-field">
                        <label htmlFor="name">Confirma senha</label>
                        <input type="password" name="cf_senha" />
                     </div>
                     <a href="#" className="btn-salvar-info">Salvar</a>
                  </form>
               </div>
            </div>
         </section>
      </PageInterna1>
   );
}

export default EsqueceuSenha;