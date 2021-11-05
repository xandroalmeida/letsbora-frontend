import CryptoJS from 'crypto-js';
import config from '../config';

export function splitArray(size, arrDefault) {
   let chunk_size = size;
   let arr = arrDefault;
   let groups = arr.map(function (e, i) {
      return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
   }).filter(function (e) { return e; });
   // console.log({ arr, groups })
   return groups;
}

export function baseUrl() {
   const isProd = process.env.NODE_ENV === 'production';
   const baseUrl = isProd ? 'https://letsborafrontend.s3.amazonaws.com' : 'https://letsborafrontend.s3.amazonaws.com';
   return baseUrl;
}

export function shorten(str, maxLen, separator = ' ') {
   if (str.length <= maxLen) return str;
   return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
}

export function retrieveWeekDays(value) {
   const days = [];
   const bitmask = reverse(decbin(value));
   for (let i = 0, s = bitmask.length; i < s; i++) {
      const daymask = parseInt(bitmask[i]);
      if (daymask) {
         days.push(Math.pow(2, i));
      }
   }

   return days;
}

function reverse(s) {
   return [...s].reverse().join("");
}

function decbin(number) {
   if (number < 0) {
      number = 0xFFFFFFFF + number + 1
   }
   return parseInt(number, 10)
      .toString(2)
}

export function setCookie(name, value, days) {
   var expires = "";
   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function decryptTokenAuth(data) {
   const bytes = CryptoJS.AES.decrypt(data, config.secret_token_key);
   return bytes.toString(CryptoJS.enc.Utf8);
}

export function currencyFormat(num) {
   return `R$ ${num.toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}

export function cleanNullFromArray(array) {
   const cleanedArr = array.filter(function (el) {
      return el != null;
   });

   return cleanedArr;
}

export function formatDate(str) {
   const data = new Date(str);
   
   let date = data.getDate();
   if(date < 10)
   {
      date = `0${date}`;
   }

   let month = data.getMonth() + 1;
   if(month < 10)
   {
      month = `0${month}`;
   }

   return `${date}/${month}/${data.getFullYear()}`;
}