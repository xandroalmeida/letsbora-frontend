import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Loading from '../../Loading';
import {getUserDataInfo} from '../../../api/connect_api';

const FormUserData = ({register, errors, userDataCookie, enableNameEmail}) => {

   const [userData, setUserData] = useState(userDataCookie ? userDataCookie:null);

   const [idUser, setIdUser] = useState(userData && userData.id ? userData.id:'');
   const [nome, setNome] = useState(userData && userData.nome ? userData.nome:'');
   const [email, setEmail] = useState(userData && userData.email ? userData.email:'');
   const [idade, setIdade] = useState('');
   const [endereco, setEndereco] = useState('');
   const [complemento, setComplemento] = useState('');
   const [cidade, setCidade] = useState('');
   const [estado, setEstado] = useState('');
   const [telefone, setTelefone] = useState('');
   const [cep, setCep] = useState('');
   const [cpf, setCpf] = useState('');

   const [loading, setLoading] = useState(null);
   const [alreadyLoadInfo, setAlreadyLoadInfo] = useState(false);

   useEffect(()=>{
      console.log('userData', userData);
      if(userData)
      {
         if(alreadyLoadInfo===false)
         {
            fetchUserDataInfo();
            setAlreadyLoadInfo(true);   
         }

         if(userData.data && userData.data.cpf)
         {
            setCpf(userData.data.cpf);
         }

         if(userData.data && userData.data.idade)
         {
            setIdade(userData.data.idade);
         }

         if(userData.data && userData.data.phone)
         {
            setTelefone(userData.data.phone);
         }

         if(userData.data && userData.data.userAddress[0])
         {
            const addressInfo = userData.data.userAddress[0];
            
            if(addressInfo.zipcode) setCep(addressInfo.zipcode);
   
            if(addressInfo.address) setEndereco(addressInfo.address);
   
            if(addressInfo.complement) setComplemento(addressInfo.complement);
   
            if(addressInfo.city) setCidade(addressInfo.city);
   
            if(addressInfo.province) setEstado(addressInfo.province);
         }

      }
   }, [userData]);

   async function fetchUserDataInfo() {
      setLoading(true);
      console.log('userData.id', userData.id);
      const userInfo = await getUserDataInfo(userData.id);
      setUserData(userInfo);
      setLoading(false);
   }

   return (
      <>
         {loading && <Loading lighter={1} width={60} />}
         <input type="hidden" ref={register} name="idUser" value={idUser} />
         <div className="box-field">
            <label htmlFor="name">Nome</label>
            {enableNameEmail && <input type="text"
               ref={register({ required: true, maxLength: 100 })}
               name="name"
               onChange={(event) => setNome(event.target.value)}
               value={nome}
               className={errors.name && 'input-error'}
            />}
            {!enableNameEmail && <input type="text"
               ref={register({ required: true, maxLength: 100 })}
               name="name"
               onChange={(event) => setNome(event.target.value)}
               value={nome}
               className={errors.name && 'input-error'}
               readOnly
            />}
            
            {errors.name &&
               <>
                  {errors.name?.type === "required" && <div className="error_block">Nome é obrigatório.</div>}
                  {errors.name?.type === "maxLength" && <div className="error_block">Máximo de caracteres para o nome é 100 caracteres.</div>}
               </>
            }
         </div>
         <div className="box-field">
            <label htmlFor="email">Email</label>
            {enableNameEmail && <input type="text"
               name="email"
               defaultValue={email}
               ref={register({ required: true, pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/ })}
               className={errors.email && 'input-error'}
            />}
            {!enableNameEmail && <input type="text"
               name="email"
               defaultValue={email}
               ref={register({ required: true, pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/ })}
               className={errors.email && 'input-error'}
               readOnly
            />}
            
            {errors.email &&
               <>
                  {errors.email?.type === "required" && <div className="error_block">Email é obrigatório.</div>}
                  {errors.email?.type === "pattern" && <div className="error_block">Email inválido.</div>}
               </>
            }
         </div>
         <div className="box-field-half">
            <div>
               <label htmlFor="cpf">CPF</label>
               <InputMask
                  mask={'999.999.999-99'}
                  onChange={(event) => setCpf(event.target.value)}
                  value={cpf}
                  name="cpf"
                  formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                  maskChar={null}
               >
                  {(inputProps) => (
                     <input
                        type="text"
                        ref={register({
                           required: true,
                           pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/,
                        })}
                        value={inputProps.cpf}
                        name={inputProps.name}
                        className={errors.cpf && 'input-error'}
                        {...inputProps}
                     />
                  )}
               </InputMask>
               {errors.cpf &&
                  <>
                     {errors.cpf?.type === "required" && <div className="error_block">CPF é obrigatório.</div>}
                     {errors.cpf?.type === "pattern" && <div className="error_block">CPF inválido.</div>}
                  </>
               }
            </div>
            <div>
               <label htmlFor="idade">Idade</label>
               <input type="text"
                  ref={register({ required: true })}
                  maxLength={2}
                  defaultValue={idade}
                  className={errors.idade && 'input-error'}
                  name="idade" />
               {errors.idade &&
                  <>
                     {errors.idade?.type === "required" && <div className="error_block">Idade é obrigatório.</div>}
                  </>
               }
            </div>
         </div>
         <div className="box-field-half">
            <div>
               <label htmlFor="phone">Celular</label>
               <InputMask
                  mask={telefone.length < 15 ? '(99) 9999-9999?' : '(99) 99999-9999'}
                  onChange={(event) => setTelefone(event.target.value)}
                  value={telefone}
                  name="telefone"
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
               {errors.telefone &&
                  <>
                     {errors.telefone?.type === "required" && <div className="error_block">Telefone é obrigatório.</div>}
                     {errors.telefone?.type === "pattern" && <div className="error_block">Telefone inválido.</div>}
                  </>
               }
            </div>
            <div>
               <label htmlFor="cep">CEP</label>
               <InputMask
                  ref={register}
                  type="text"
                  mask={'99999-999'}
                  name="cep"
                  onChange={(event) => setCep(event.target.value)}
                  value={cep}
                  formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                  maskChar={null}
               >
                  {(inputProps) => (
                     <input
                        type="text"
                        ref={register({
                           required: true,
                           pattern: /[0-9]{5}-[\d]{3}/,
                        })}
                        value={inputProps.cep}
                        name={inputProps.name}
                        className={errors.cep && 'input-error'}
                        {...inputProps}
                     />
                  )}
               </InputMask>
               {errors.cep &&
                  <>
                     {errors.cep?.type === "required" && <div className="error_block">CEP é obrigatório.</div>}
                     {errors.cep?.type === "pattern" && <div className="error_block">CEP inválido.</div>}
                  </>
               }
            </div>
         </div>
         <div className="box-field-half">
            <div>
               <label htmlFor="endereco">Endereço</label>
               <input type="text"
                  name="endereco"
                  defaultValue={endereco}
                  ref={register({ required: true })}
                  className={errors.endereco && 'input-error'} />
               {errors.endereco &&
                  <>
                     {errors.endereco?.type === "required" && <div className="error_block">Endereço é obrigatório.</div>}
                  </>
               }
            </div>
            <div>
               <label htmlFor="complemento">Complemento</label>
               <input type="text"
                  ref={register({ required: true })}
                  name="complemento"
                  defaultValue={complemento}
                  placeholder="Número, apartamento, suite, unidade, etc."
                  className={errors.complemento && 'input-error'} />
               {errors.complemento &&
                  <>
                     {errors.complemento?.type === "required" && <div className="error_block">Complemento é obrigatório.</div>}
                  </>
               }
            </div>
         </div>
         <div className="box-field-half">
            <div>
               <label htmlFor="cidade">Cidade</label>
               <input type="text"
                  ref={register({ required: true, minLength: 5 })}
                  name="cidade"
                  defaultValue={cidade}
                  className={errors.cidade && 'input-error'} />
               {errors.cidade &&
                  <>
                     {errors.cidade?.type === "required" && <div className="error_block">Cidade é obrigatório.</div>}
                     {errors.cidade?.type === "minLength" && <div className="error_block">Mínimo de caracteres para a Cidade é 5 caracteres.</div>}
                  </>
               }
            </div>
            <div className="input-uppercase">
               <label htmlFor="estado">Estado</label>
               <input type="text"
                  ref={register({ required: true })}
                  maxLength={2}
                  name="estado"
                  defaultValue={estado}
                  className={errors.estado && 'input-error'} />
               {errors.estado &&
                  <>
                     {errors.estado?.type === "required" && <div className="error_block">Estado é obrigatório.</div>}
                  </>
               }
            </div>
         </div>
      </>
   );
}

export default FormUserData;