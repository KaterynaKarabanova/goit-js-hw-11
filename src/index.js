import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import { createMarkup } from './common.js';

const BASE_URL = 'https://pixabay.com/api/?key=39007131-7339e45b97efcc367872ff842';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = "";

  const inputValue = this.searchQuery.value.trim();
  const FULL_URL = `${BASE_URL}&q=${inputValue}&image_type=photo`;

  axios
    .get(FULL_URL)
    .then((resp) => resp.data)
    .then((data) => {
      createMarkup(data.hits);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh()
      gallery.addEventListener("click", (e) => {
        console.log(e.target.classList);
         if (e.target.classList.contains("gallery__link")) {
            return;
         }
         lightbox.open();
      });
    })
    .catch((error) => console.error(error));

  e.currentTarget.reset();
}