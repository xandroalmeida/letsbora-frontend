import Cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { getAllExperiencesFilter, searchCustomExperience } from "../../api/connect_api";
import Loading from "../../components/Loading";
import config from "../../config";
import { pathsMenu } from "../../utils/routes";
import { cleanNullFromArray } from '../../utils/utils';
import ImageContainer from "../ImageContainer";
import EscolhaEstilos from "./EscolhaEstilos";
import EscolhaInteresses from "./EscolhaInteresses";

function FormPersonalizacao({onChangeStep}) {

   const { register, handleSubmit, errors } = useForm();

   const [step, setStep] = useState(1);
   const [loadingSearch, setLoadingSearch] = useState(false);
   const [errorEstilos, setErrorEstilos] = useState(null);
   const [filtersExperiences, setFiltersExperiences] = useState(null);

   const [name, setName] = useState('');
   const [telefone, setTelefone] = useState('');
   const [email, setEmail] = useState('');
   const [idade, setIdade] = useState('');

   const [formDataSaved, setFormDataSaved] = useState(null);
   const [arrEstilos, setArrEstilos] = useState(null);
   const [arrInteresses, setArrInteresses] = useState(null);


   useEffect(() => {
      fetchExperiencesFilter()
   }, []);

   async function fetchExperiencesFilter() {
      const filtersExperiences = await getAllExperiencesFilter();
      const filtersOrganized = organizeFiltersByGroup(filtersExperiences.data);
      console.log('filtersOrganized', filtersOrganized);
      setFiltersExperiences(filtersOrganized);
   }

   function organizeFiltersByGroup(data) {
      const arrGroupsFilters = [];

      for (let index = 0; index < data.length; index++) {
         const element = data[index];
         if (!arrGroupsFilters[element.groupid]) {
            arrGroupsFilters[element.groupid] = [];
         }

         arrGroupsFilters[element.groupid].push(element.name);
      }

      return arrGroupsFilters;
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
      }
   }

   function onCheckedEstilos(data) {
      setArrEstilos(data);
   }

   function onChangedInteresses(data) {
      setArrInteresses(data);
   }

   const onSubmit = formData => {
      console.log('formData', formData);
      setErrorEstilos(false);

      console.log(arrEstilos);
      if (!arrEstilos || arrEstilos.length === 0) {
         setErrorEstilos(true);
         return;
      }

      setFormDataSaved(formData);
      onChangeStep(2);
      setStep(2);
   }

   async function postFiltersExperiences() {
      if (formDataSaved && arrEstilos && arrInteresses) {
         setLoadingSearch(true);
         const objToSearch = {
            formData: formDataSaved,
            estilos: arrEstilos,
            interesses: cleanNullFromArray(arrInteresses)
         };

         const respCustomExperience = await searchCustomExperience(objToSearch);

         console.log('respCustomExperience', respCustomExperience);
         if (respCustomExperience.data && respCustomExperience.data.error === 0 && respCustomExperience.data.experiences.length > 0) {
            const obj = {
               formData: formDataSaved,
               experiences: respCustomExperience.data.experiences
            }
            localStorage.setItem(config.cookieCustomExperience, JSON.stringify(obj));
            Router.push({
               pathname: pathsMenu.expPersonalizada
            })
         }

         // setLoadingSearch(false);
      }
   }

   function Step1() {
      return (
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
                     ref={register({ required: true, maxLength: 100 })}
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
            </div>
            <div className="estilo">
               <h4>Qual seu estilo de viagem?</h4>

               <EscolhaEstilos onCheckedEstilos={(data) => onCheckedEstilos(data)} />
            </div>
         </form>
      );
   }

   function Step2() {
      return <EscolhaInteresses onChangedInteresses={(data) => onChangedInteresses(data)} filtersExperiences={filtersExperiences} />;
   }

   return (
      <div className="form-personalizacao">
         {loadingSearch && <div className="loading-results">
            <Loading lighter={1} width={80} />
            <h4>Aguarde um momento por favor estamos gerando as melhores experiências para seu perfil.</h4>
         </div>}
         <p>{step}/2</p>
         {step === 1 && <h3 className="first-title">Conta Mais!</h3>}
         {step === 1 && Step1()}
         {step === 2 && Step2()}

         {!loadingSearch && <div className="actions-form">
            {step === 1 && <button type="submit" form="form-personalizar-step1" className="btn-avancar">
               Avançar
               <ImageContainer src="/assets/imgs/arrow_right_avancar.svg" alt="Avançar" width="12" height="24" />
            </button>}

            {step === 2 && <>
               <a href="#" className="btn-voltar" onClick={() => setStep(1)}>
                  <ImageContainer src="/assets/imgs/arrow_right_avancar.svg" alt="Avançar" width="12" height="24" />
               Voltar
            </a>
               <a onClick={() => postFiltersExperiences()} className="btn-buscar">
                  buscar
            </a>
            </>}

         </div>}
         { Object.keys(errors).length > 0 && <div className="help-line">Por favor preencha todos os campos corretamente para prosseguir.</div>}
         { errorEstilos && <div className="help-line">Por favor escolha ao menos 1 opção de estilo de viagem.</div>}
      </div>
   );
}

export default FormPersonalizacao;