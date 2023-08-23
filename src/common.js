
const gallery = document.querySelector('.gallery');
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
 function createMarkup(arr) {
  const markup = arr
    .map(({ webformatURL, largeImageURL, tags, likes, views,comments, downloads }) => `
      <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy">
          <div class="info">
            <p class="info-item">
                <b>Likes </b><br>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views </b><br>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b><br>
                 ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b><br>
                 ${downloads}
            </p>
        </div>
        </a>
      </div>
    `)
    .join("");

     gallery.insertAdjacentHTML("beforeend", markup)
        
}

export { createMarkup }
