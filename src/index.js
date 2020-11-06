import './styles.css';
import ImagesApiService from './apiService';
import galleryTemplate from './templates/gallery.hbs';
import Debounce from 'lodash.debounce';

const imagesApiService = new ImagesApiService();

const refs = {
  bodyEl: document.querySelector('body'),
  inputEl: document.querySelector('.image-search-field'),
};

refs.inputEl.addEventListener('input', Debounce(onSearch, 500));

function onSearch(event) {
  //   clearOldSearchResults();

  imagesApiService.query = event.target.value;

  if (imagesApiService.query) {
    imagesApiService.fetchImages().then(createGallery);
  }
}

function createGallery(gallery) {
  if (countriesList.length > 10) {
    error({
      text: 'Результат пошуку надто великий. Зробіть запит більш унікальним!',
    });
    return;
  }

  if (countriesList.length === 1) {
    refs.bodyEl.insertAdjacentHTML('beforeend', countryTemplate(countriesList));
    success({
      text: 'Ура! Країну знайдено :)',
    });
    return;
  }

  refs.bodyEl.insertAdjacentHTML(
    'beforeend',
    countriesListTemplate(countriesList),
  );
  info({
    text: 'Виведено список країн за запитом.',
  });
}
