import { UnsplashAPI } from './jsonplaceholder-api.js';
import { createGalleryCards } from './gallery-card.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const searchBtnEl = document.querySelector('.search-btn');

const unsplashAPI = new UnsplashAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  searchBtnEl.disabled = true;
  searchBtnEl.classList.add('disabled');

  unsplashAPI.q = event.target.elements.searchQuery.value;
  unsplashAPI.page = 1;

  try {
    const { data } = await unsplashAPI.fetchPhotosByQuerty();
    if (data.hits.length === 0) {
      searchBtnEl.disabled = false;
      searchBtnEl.classList.remove('disabled');
      event.target.reset();
      galleryListEl.innerHTML = ' ';
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    if (data.totalHits < 40) {
      searchBtnEl.disabled = false;
      searchBtnEl.classList.remove('disabled');
      galleryListEl.innerHTML = createGalleryCards(data.hits);
      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

   

    galleryListEl.innerHTML = createGalleryCards(data.hits);
    loadMoreBtnEl.classList.remove('is-hidden');
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    console.log(err);
  }

  searchBtnEl.disabled = false;
  searchBtnEl.classList.remove('disabled');
};

const onLoadMoreBtnClick = async event => {
  loadMoreBtnEl.disabled = true;
  loadMoreBtnEl.classList.add('disabled');

  unsplashAPI.page += 1;

  try {
    const { data } = await unsplashAPI.fetchPhotosByQuerty();

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );

    if (Math.ceil(data.totalHits / 40) < unsplashAPI.page) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
  } catch (err) {
    console.log(err);
  }

  loadMoreBtnEl.disabled = false;
  loadMoreBtnEl.classList.remove('disabled');
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
