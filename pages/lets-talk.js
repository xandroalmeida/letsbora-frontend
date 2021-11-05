import { useEffect, useState } from 'react';
import PageDefault from '../layouts/PageDefault';
import ImageContainer from '../components/ImageContainer';
import Loading from '../components/Loading';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { sendContactForm } from '../api/connect_api';
import {eventGA} from '../utils/gtm';

function LetsTalk() {

   const { register, handleSubmit, errors } = useForm();

   const [sendingMessage, setSendingMessage] = useState(null);
   const [sendingError, setSendingError] = useState(null);
   const [sendingSuccess, setSendingSuccess] = useState(null);

   const [name, setName] = useState('');
   const [telefone, setTelefone] = useState('');
   const [email, setEmail] = useState('');
   const [idade, setIdade] = useState('');
   const [mensagem, setMensagem] = useState('');

   const onSubmit = formData => {
      console.log('formData', formData);

      sendFormData(formData);
   }

   async function sendFormData(data) {
      setSendingMessage(true);
      const resp = await sendContactForm(data);
      if(!resp.data || !resp.data.error === 1)
      {
         setSendingError(true);
         return;
      }
      setSendingSuccess(true);
      setSendingMessage(false);
      cleanTexts();
   }

   function handleChange(text, input) {
      if (input === "Nome") {
         setName(text);
      } else if (input === "Telefone") {
         setTelefone(text);
      } else if (input === "Email") {
         setEmail(text);
      } else if (input === "Idade") {
         setIdade(text);
      } else if (input === "Mensagem") {
         setMensagem(text);
      }
   }

   function cleanTexts() {
      setName('');
      setTelefone('');
      setEmail('');
      setIdade('');
      setMensagem('');
   }

   function actionSendSuccessForm() {
      window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-612583037/Cnp9CKyvy4kCEP2MjaQC'});
      return <div className="alert alert-success">Contato enviado com sucesso. Retornaremos o mais breve possível.</div>;
   }

   return (
      <PageDefault>
         <section className="container-experiencias-filtrar page-lets-talk">
            <div className="row">
               <div className="col-filter">
                  <div></div>
                  <div className="form-personalizacao">
                     <h3 className="first-title">Let's Talk</h3>
                     <form id="form-personalizar-step1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="info-pessoais">
                           <div id="float-label">
                              <input type="nome"
                                 ref={register({ required: true, maxLength: 100 })}
                                 name="nome"
                                 value={name}
                                 onChange={(e) => handleChange(e.target.value, "Nome")}
                                 className={errors.nome && 'input-error'}
                              />

                              <label className={name != "" ? "Active" : ""} htmlFor="nome">
                                 Nome
                              </label>
                           </div>
                           <div id="float-label">
                              <InputMask
                                 mask={telefone.length < 15 ? '(99) 9999-9999?' : '(99) 99999-9999'}
                                 name="telefone"
                                 onChange={(event) => setTelefone(event.target.value)}
                                 value={telefone}
                                 formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                                 maskChar={null}
                              >
                                 {(inputProps) => (
                                    <input
                                       type="text"
                                       ref={register({
                                          required: true,
                                          pattern: /(\([1-9][0-9]\)?|[1-9][0-9])\s?([9]{1})?([0-9]{4})-?([0-9]{4})$/,
                                       })}
                                       value={inputProps.telefone}
                                       name={inputProps.name}
                                       className={errors.telefone && 'input-error'}
                                       {...inputProps}
                                    />
                                 )}
                              </InputMask>
                              <label className={telefone != "" ? "Active" : ""} htmlFor="telefone">
                                 Telefone
                              </label>
                           </div>
                           <div id="float-label">
                              <input type="email"
                                 ref={register({ required: true, pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/ })}
                                 name="email"
                                 value={email}
                                 onChange={(e) => handleChange(e.target.value, "Email")}
                                 className={errors.email && 'input-error'}
                              />

                              <label className={email != "" ? "Active" : ""} htmlFor="email">
                                 Email
                              </label>
                           </div>
                           <div id="float-label">
                              <input type="text"
                                 ref={register({ required: true })}
                                 name="idade"
                                 maxLength={2}
                                 value={idade}
                                 onChange={(e) => handleChange(e.target.value, "Idade")}
                                 className={errors.idade && 'input-error'}
                              />

                              <label className={idade != "" ? "Active" : ""} htmlFor="Idade">
                                 Idade
                              </label>
                           </div>
                           <div id="float-label" className="w-full">
                              <textarea type="text"
                                 ref={register({ required: true })}
                                 name="mensagem"
                                 value={mensagem}
                                 onChange={(e) => handleChange(e.target.value, "Mensagem")}
                                 className={errors.mensagem && 'input-error'}
                              />

                              <label className={mensagem != "" ? "Active" : ""} htmlFor="Idade">
                                 Mensagem
                              </label>
                           </div>
                        </div>

                        {sendingMessage && <Loading lighter={1} width={65} />}
                        {sendingError && <div className="alert alert-danger">Falha ao enviar o email. Por favor entre em contato com a nossa equipe pelo telefone: <strong>+55 (11) 97065 6786</strong></div>}
                        {sendingSuccess && actionSendSuccessForm()}
                        {!sendingMessage && <button type="submit" className="btn-buscar">Enviar</button>}
                     </form>
                  </div>
                  <div></div>
               </div>
               <div className="col-imgs-experiencias">
                  <ImageContainer src="/assets/imgs/img_filtro_experiencia_step1.jpg" alt="Experiências Personalização 1" />
               </div>
            </div>
         </section>
      </PageDefault>
   );
}

export default LetsTalk;