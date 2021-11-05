// import Cookie from 'js-cookie';

let urlBackEnd = null;

if (process.browser) {
   urlBackEnd = window.location.hostname.includes('localhost')
      ? 'https://gerenciador.letsborabr.com'
      : 'https://gerenciador.letsborabr.com';
}

const urlS3 = "https://letsborafrontend.s3.amazonaws.com/";

const cookieAuth = "letsboraauthinfo";
const cookieCart = "letsboracart";
const cookieCustomExperience = "letsboracustomexpirience";
const cookieSearch = "letsborasearchdata";
const secret_token_key = "meqzftGvaXsPeekG7QpFpZwLvUkSGe7s6Lz28XBKySczCxBwwmBZTLhHG4m3FE2V";

const arrEstilos = ['Arte e Cultura', 'Comer e Beber', 'Esporte', 'Natureza', 'Praia', 'Road trip', 'Safari'];
const arrCidades = ['Cape Town', 'Johannesburg', 'Garden Route', 'Kruger National Park', 'Todas as cidades'];


async function checkAuth() {
   const auth = await Cookie.get(cookieAuth);
   return auth;
}

export default {
   urlBackEnd,
   urlS3,
   cookieCart,
   secret_token_key,
   cookieAuth,
   checkAuth,
   cookieCustomExperience,
   arrEstilos,
   arrCidades,
   cookieSearch
};