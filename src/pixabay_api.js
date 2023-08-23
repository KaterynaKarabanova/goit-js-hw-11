import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';

export class PixabayApiImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalPages = 0;
  }

 

  incrementPage() {
    return (this.page += 1);
  }

  resetPage() {
    return (this.page = 1);
  }
  setparam(BASE_URL, object) {
     const options = new URLSearchParams(object);
    const FULL_URL = `${BASE_URL}&${options}`;
    return FULL_URL
  }
//   setTotal(total) {
//     return (this.totalPages = total);
//   }

//   resetTotalPage() {
//     return (this.totalPages = 0);
//   }

//   hasMoreImages() {
//     return this.page === Math.ceil(this.totalPages / this.per_page);
//   }
}