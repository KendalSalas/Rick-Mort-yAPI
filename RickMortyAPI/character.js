import { getApiOnce } from "./modules/getApiOnce.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

let URL = 'https://rickandmortyapi.com/api/character';
let urlChar = `${URL}/${id}`;

console.log(urlChar);

document.addEventListener("DOMContentLoaded", e => getApiOnce(urlChar));




