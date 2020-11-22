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

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryContainer.addEventListener('click', onOpenModal);

// пофискить кнопку
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const apiService = new ApiService();

// поиск по строке input и рендер шаблона страницы
function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(appendArticlesMarkup);
  // добавить проверку на ошибку, если пользователь не корректно ввел данные поиска
  apiService.resetPage();
  clearArticlesContainer();
}
// добавить скролл
// function fetchImages() {
//   apiService.fetchImages().then(gallery => {
//     appendArticlesMarkup(gallery);
//     loadMoreBtn.enable();
//   });
// }

// запуск кнопки load more
function onLoadMore() {
  apiService.fetchImages().then(appendArticlesMarkup);
}

// рендеринг шаблона разметки
function appendArticlesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

// очистка контента
function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
