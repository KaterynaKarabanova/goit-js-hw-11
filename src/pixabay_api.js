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
  
  async render(FULL_URL) {
  const resp = await axios.get(FULL_URL);
  return resp.data;
}
  
  resetPage() {
    return (this.page = 1);
  }
  setparam(BASE_URL, object) {
     const options = new URLSearchParams(object);
    const FULL_URL = `${BASE_URL}&${options}`;
    return FULL_URL
  }
}