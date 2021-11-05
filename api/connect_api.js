import axios from 'axios';
import config from '../config';

const configHeader = {
   headers: {
      // Authorization: `Bearer ${config.tokenAuth}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
   },
}

const configHeaderJsonLd = {
   headers: {
      // Authorization: `Bearer ${config.tokenAuth}`,
      'Content-Type': 'application/ld+json',
      Accept: 'application/ld+json'
   },
}

function getJson(url, type) {
   const urlFinal = `${config.urlBackEnd}${url}`;
   return axios
      .get(urlFinal, type && type === 'json-ld' ? configHeaderJsonLd:configHeader)
      .then(res => {
         return res;
      })
      .catch(error => {
         console.log("error", error);
         return error;
      });
}

function postJson(url, objPost) {
   const urlFinal = `${config.urlBackEnd}${url}`;
   return axios
      .post(urlFinal, {...objPost}, configHeader)
      .then(res => {
         return res;
      })
      .catch(error => {
         console.log("error", error);
         return error;
      });
}

export function getCitiesExp(url) {
   return getJson(url);
}

export function getAllExperiences() {
   return getJson('/api/experiencias', 'json-ld');
}

export function getAllExperiencesByPage(url) {
   return getJson(url, 'json-ld');
}

export function getAllExperiencesBySlug(slug) {
   return getJson(`/api/experiencias/${slug}`);
}

export function getDaysSchedule(id) {
   return getJson(`/api/experiencias/dayschedule/${id}`);
}

export function getExperiencesRelations(id) {
   return getJson(`/api/experiencias/relations/${id}`);
}

export function getDaysBlocked(id) {
   return getJson(`/api/scheduleblocks?experienciasIdexperiencias=${id}`);
}

export function getUserDataInfo(id) {
   return getJson(`/api/users/${id}`);
}

export function getUserCardData(id) {
   return getJson(`/api/user_cards/${id}`);
}

export function getInfoOrderDetails(id) {
   return getJson(`/api/order/detail/${id}`);
}

export function getPrecosExperiences(id) {
   return getJson(`/api/experiencias/prices/${id}`);
}

export function getAllOrdersUser(id) {
   return getJson(`/api/order/all/user/${id}`);
}

export function getAllExperiencesFilter() {
   return getJson(`/api/experiencias_filters`);
}

export function getTwoExperiences() {
   return getJson(`/api/experiencias/only/two`);
}


/*---UPDATES----*/
export function checkoutAction(obj) {
   return postJson(`/api/checkout/pargarme`, obj);
}

export function loginAction(obj) {
   return postJson(`/auth/json/login`, obj);
}

export function registerAction(obj) {
   return postJson(`/api/add/user`, obj);
}

export function updateUserData(obj) {
   return postJson(`/api/update/user`, obj);
}

export function updateCardUser(obj) {
   return postJson(`/api/update/cards/user`, obj);
}

export function searchCustomExperience(obj) {
   return postJson(`/api/experiencias/personalizadas`, obj);
}

export function searchExperiences(obj) {
   return postJson(`/api/experiencias/search`, obj);
}

export function searchExperiencesByTerm(obj) {
   return postJson(`/api/experiencias/search/term`, obj);
}

export function sendContactForm(obj) {
   return postJson(`/api/json/send/contact`, obj);
}

export function sendCheckCouponApi(obj) {
   return postJson(`/api/coupon/check`, obj);
}

export function sendEmailForgotApi(obj) {
   return postJson(`/api/user/forgot/pass`, obj);
}

export function sendNewPassApi(obj) {
   return postJson(`/api/user/reset/pass`, obj);
}