import './css/styles.css';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more';
import articlesTpl from '../templates/articles.hbs';
import onOpenModal from './js/modal';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryContainer.addEventListener('click', onOpenModal);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(appendArticlesMarkup);

  if (apiService.query === '') {
    return alert('Something is wrong...Try again');
  }
  loadMoreBtn.show();
  apiService.resetPage();
  clearArticlesContainer();
}

function onLoadMore() {
  apiService.fetchImages().then(appendArticlesMarkup);
}

// function fetchImages() {
//   loadMoreBtn.disable();
//   apiService.fetchImages().then(gallery => {
//     appendArticlesMarkup(gallery);
//     loadMoreBtn.enable();
//   });
// }

function appendArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
