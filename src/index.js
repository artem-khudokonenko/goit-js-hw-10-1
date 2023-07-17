import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const selektEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');
axios.defaults.headers.common['x-api-key'] =
  'live_rInuIsMq80pYMMWxOVvaU9QgmlrexaQEFV6NLj5QlzfJc3QoRd5bw4wP0tipkjLA';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

fetchBreeds()
  .then(responce => {
    selektEl.hidden = false;
    selektEl.innerHTML = responce
      .map(({ id, name }) => {
        return `<option class="option" value="${id}">${name}</option>`;
      })
      .join('');
    new SlimSelect({
      select: '#sing',
      events: {
        afterChange: newVal => {
          loaderEl.hidden = false;
          catInfo.innerHTML = '';
          fetchCatByBreed(newVal[0].value)
            .then(responce => {
              catInfo.innerHTML = responce
                .map(
                  ({ url, breeds: [{ name, description, temperament }] }) => {
                    return `<img src="${url}" alt="${name}" width="300">
            <h3>${name}</h3>
            <p>${description}</p>
            <p><b>Temperament:&nbsp</b>${temperament}</p>`;
                  }
                )
                .join('');
            })
            .catch(() => {
              Notiflix.Notify.failure(errorEl.textContent);
            })
            .finally(() => (loaderEl.hidden = true));
        },
      },
    });
  })
  .catch(() => {
    Notiflix.Notify.failure(errorEl.textContent);
  })
  .finally(() => (loaderEl.hidden = true));
