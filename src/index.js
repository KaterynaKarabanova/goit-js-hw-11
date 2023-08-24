
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import { createMarkup } from './common.js';
import Notiflix from 'notiflix';
import { PixabayApiImages } from './pixabay_api.js';

const BASE_URL = 'https://pixabay.com/api/?key=39007131-7339e45b97efcc367872ff842';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector(".load-button");
const pixabay = new PixabayApiImages();

searchForm.addEventListener('submit', onSubmit);
loadMore.addEventListener("click", onLoadMore)
gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery__link")) {
    return;
  }
});

async function onSubmit(e) {
  loadMore.style.display = "none";
  pixabay.resetPage();
  e.preventDefault();
  gallery.innerHTML = "";
  if(this.searchQuery.value.trim()===""){return }
  pixabay.q = this.searchQuery.value.trim();
  
  
  try {
    const data = await pixabay.render(pixabay.setparam(BASE_URL, pixabay));
    if (data.hits.length <=0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      searchForm.reset();
      return
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    pixabay.totalPages = data.totalHits / pixabay.per_page;
    createMarkup(data.hits);
   if(Math.ceil(pixabay.totalPages)!==pixabay.page){ loadMore.style.display = "block"}
  } catch (error) {
    console.error(error);
  }
  searchForm.reset();
}
 
async function onLoadMore() {
  try {
    pixabay.incrementPage();
      if (Math.ceil(pixabay.totalPages)==pixabay.page) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.",{timeout: 8000});
        loadMore.style.display = "none"
    }
    const data = await pixabay.render(pixabay.setparam(BASE_URL, pixabay));
    pixabay.totalPages = data.totalHits / pixabay.per_page;
    createMarkup(data.hits);
  }
  catch(error) {
    console.error(error);
  }
}

