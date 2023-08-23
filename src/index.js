
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
  pixabay.q = this.searchQuery.value.trim();
  
  try {
    const data = await render(pixabay.setparam(BASE_URL, pixabay));
  
    
    if (data.hits.length <=0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      searchForm.reset();
      return
    }
    
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    pixabay.totalPages = data.totalHits / pixabay.per_page;
    createMarkup(data.hits);
    loadMore.style.display = "block";
  } catch (error) {
    console.error(error);
  }
  
  searchForm.reset();
  
}

async function render(FULL_URL) {
  const resp = await axios.get(FULL_URL);
  return resp.data;
}
loadMore.addEventListener("click", onLoadMore)
function onLoadMore() {

  console.log(Math.ceil(pixabay.totalPages),pixabay.page);
  if (Math.ceil(pixabay.totalPages)>pixabay.page) {
   pixabay.incrementPage()
    render(pixabay.setparam(BASE_URL, pixabay))
    .then((data) => {
      pixabay.totalPages = data.totalHits / pixabay.per_page
      createMarkup(data.hits);
      loadMore.style.display = "block"
    })
    .catch((error) => console.error(error))

    return
  }
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMore.style.display = "none"
}
