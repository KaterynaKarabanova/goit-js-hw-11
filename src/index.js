// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
var lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: `alt` ,
    captionPosition: `bottom`,
    captionDelay: 250, 
});
import axios from 'axios';
import {createMarkup} from './common.js'
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38988913-d6c8c466115d184c57d1b7d80';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    gallery.innerHTML = ""

  const inputValue = this.searchQuery.value.trim();
  console.log(inputValue);
const FULL_URL = `${PROXY_URL}${BASE_URL}?key=${API_KEY}&q=${inputValue}`;
  axios
    .get(FULL_URL)
    .then((resp) => {
            if (!resp.ok) {
            throw new Error(resp.statusText)
            }
            return resp.json()
    })
    .then((data) =>console.log(data.hits))
    .catch((error) => console.error(error));
  e.currentTarget.reset();
}



