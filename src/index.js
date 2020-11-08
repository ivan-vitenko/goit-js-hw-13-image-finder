import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import ImagesApiService from './apiService';
import galleryTemplate from './templates/gallery.hbs';
import largeImage from './templates/large-image.hbs';
import Debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';

const imagesApiService = new ImagesApiService();

const refs = {
  bodyEl: select('body'),
  inputEl: select('.image-search-field'),
};

refs.inputEl.addEventListener('input', Debounce(onSearch, 500));

function onSearch(event) {
  clearSearchResults();

  imagesApiService.query = event.target.value;

  if (imagesApiService.query) {
    createGallery();
    try {
      imagesApiService.fetchImages().then(addItemsInGallery);
    } catch (error) {
      alert(`${error}`);
    }
    setNextPage();
  }
}

function createGallery() {
  refs.bodyEl.insertAdjacentHTML('beforeend', '<ul class="gallery"></ul>');
}

function setNextPage() {
  imagesApiService.page += 1;
}

function addItemsInGallery(gallery) {
  select('.gallery').insertAdjacentHTML(
    'beforeend',
    galleryTemplate(gallery.hits),
  );

  select('.gallery').addEventListener('click', showLargeImage);

  if (!select('.load-more-button') && gallery.total > 12) {
    addLoadMoreButton();
  }

  scrollToEndPage();
}

function showLargeImage(event) {
  basicLightbox
    .create(
      `<img src="${event.target
        .closest('.gallery__item')
        .querySelector('img')
        .getAttribute('large-src')}">`,
    )
    .show();
}

function scrollToEndPage() {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}

function select(element) {
  return document.querySelector(element);
}

function addLoadMoreButton() {
  refs.bodyEl.insertAdjacentHTML(
    'beforeend',
    '<button class="load-more-button">Показати ще...</button>',
  );

  select('.load-more-button').addEventListener('click', showMoreImages);
}

function showMoreImages() {
  imagesApiService.fetchImages().then(addItemsInGallery);
  imagesApiService.page += 1;
}

function clearSearchResults() {
  removeOldElement(document.querySelector('.gallery'));
  removeOldElement(document.querySelector('.load-more-button'));
  imagesApiService.page = 1;
}

function removeOldElement(element) {
  if (element) {
    element.remove();
  }
}
