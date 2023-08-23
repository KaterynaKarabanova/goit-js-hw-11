const searchParams = new URLSearchParams({
  q : 5,
 image_type: "photo",
    orientation: horizontal,
    safesearch: true
});

console.log(searchParams.toString()); // "_limit=5&_sort=name"
const BASE_URL = 'https://pixabay.com/api/?key=39007131-7339e45b97efcc367872ff842';
const url = `${BASE_URL}${searchParams}`;
console.log(url);
