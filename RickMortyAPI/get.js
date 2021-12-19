import { getApi } from "./modules/getApi.js";

let URL = 'https://rickandmortyapi.com/api/character';

const $form = document.getElementById('findChar');
let option = document.getElementById('kind');

document.addEventListener('DOMContentLoaded', e => getApi(URL));

document.addEventListener('click', (e) => {
    if (e.target.matches('#navegacion a')) {
        e.preventDefault();

        console.log(e.target.getAttribute('href'));

        let urlNav = e.target.getAttribute('href');
        getApi(urlNav);
    }

    if(e.target.matches('.data')){
        let id = e.target.id;
        let urlChar = `character.html?id=${id}`;

        console.log(urlChar);

        window.open(urlChar, '_blank');
    }
})

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let characterName = document.getElementById('find').value;
    let optionValue = option.value;
    console.log(optionValue);

    let urlFind = "";

    if (characterName != '' && optionValue == "All") {
        urlFind = `${URL}/?name=${characterName}`;
    } else if (characterName != '' && optionValue != "All") {
        urlFind = `${URL}/?name=${characterName}&species=${optionValue}`;
    } else if (characterName == '' && optionValue != "All") {
        urlFind = `${URL}/?species=${optionValue}`;
    } else {
        urlFind = `${URL}`;
    }

    getApi(urlFind);
})