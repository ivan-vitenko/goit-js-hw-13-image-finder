export default class ImagesApiService {
  constructor(searchQuery) {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=3749534-832657ce2c7737c7c4ba585dd`,
    );
    return await response.json();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
