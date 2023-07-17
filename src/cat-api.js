import axios from 'axios';

export function fetchBreeds() {
  return axios.get('breeds').then(({ data }) => {
    return data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(({ data }) => {
    return data;
  });
}
