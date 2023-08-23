import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import { createMarkup } from './common.js';
import Notiflix from 'notiflix';
import { PixabayApiImages } from './pixabay_api.js'

const BASE_URL = 'https://pixabay.com/api/?key=39007131-7339e45b97efcc367872ff842';
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector(".load-button")
let currentPage = 1

searchForm.addEventListener('submit', onSubmit);
loadMore.style.display = "none"
const pixabay = new PixabayApiImages();
console.log(pixabay);
function onSubmit(e) {
  loadMore.style.display = "none"
  currentPage=1
  e.preventDefault();
  gallery.innerHTML = "";
  pixabay.q = this.searchQuery.value.trim();
  const options = new URLSearchParams(pixabay);
  // const FULL_URL = `${BASE_URL}&q=${inputValue}&image_type=photo`;
  const FULL_URL = `${BASE_URL}&${options}`;
  currentUrl = FULL_URL
  render(FULL_URL)
  e.currentTarget.reset();
}
function render(FULL_URL) {
    axios
    .get(FULL_URL)
    .then((resp) => resp.data)
    .then((data) => {
      console.log(data);
      if (data.hits.length <=0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        throw new Error(err)
        
      } else if (currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      pixabay.totalPages = data.totalHits / pixabay.per_page
      createMarkup(data.hits);
       const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh()
      smoothScroll() 
      gallery.addEventListener("click", (e) => {
         if (e.target.classList.contains("gallery__link")) {
            return;
         }
      });
      loadMore.style.display = "block"
    })
    .catch((error) => console.error(error))

}
loadMore.addEventListener("click", onLoadMore)
function onLoadMore() {

  console.log(Math.ceil(pixabay.totalPages),currentPage);
  if (Math.ceil(pixabay.totalPages)>currentPage) {
    currentPage+=1
  pixabay.page = currentPage
   const options = new URLSearchParams(pixabay);
  const FULL_URL = `${BASE_URL}&${options}`;
    render(FULL_URL)
    return
  }
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMore.style.display = "none"
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

