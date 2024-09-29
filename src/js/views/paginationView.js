import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(curPage);
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev(curPage);
    }

    // Other Page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButtonNext(curPage)}
        ${this._generateMarkupButtonPrev(curPage)}
        `;
    }

    // page 1 , and NO other pages
    return ``;
  }

  _generateMarkupButtonNext(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkupButtonPrev(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
