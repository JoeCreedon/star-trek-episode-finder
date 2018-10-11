(function(window){
  class MovieListComponent{
    constructor(){
      this.url = `http://stapi.co/api/v1/rest/movie/search`
    }
    async getMovies(){
      this.response = await fetch(this.url, {method: 'GET'});
      this.data = await this.response.json();
      this.movieArray = this.data.movies;
      this.movieArray.sort((a, b) => (parseInt(a.usReleaseDate) > parseInt(b.usReleaseDate) ?1 : -1));
      this.renderMovies();
    }

    renderMovies(){
      const movieList = document.querySelector('.js-movie-list-container')
      
      const movieMarkUp = this.data.movies.map(movie => {
        console.log(movie.uid);
        const src = () => {
        switch(movie.uid){
          case 'MOMA0000006645':
          return `src="img/STMP.jpg"`
          break;
          case 'MOMA0000173722':
          return `src="img/STII.jpg"`
          break;
          case 'MOMA0000002047':
          return `src="img/STIII.jpg"`
          break;
          case 'MOMA0000002046':
          return `src="img/STIV.jpg"`
          case 'MOMA0000002045':
          return `src="img/STV.png"`
          break;
          case 'MOMA0000002044':
          return `src="img/STVI.jpg"`
          case 'MOMA0000103536':
          return `src="img/GEN.jpg"`
          break;
          case 'MOMA0000103535':
          return `src="img/FIRSTCON.jpg"`
          break;
          case 'MOMA0000003526':
          return `src="img/STIN.png"`
          break;
          case 'MOMA0000003135':
          return `src="img/STNEM.jpg"`
          break;
          case 'MOMA0000092393':
          return `src="img/ST2009.jpg"`
          case 'MOMA0000170041':
          return `src="img/INTODARK.jpg"`
          case 'MOMA0000174540':
          return `src="img/BEYOND.jpg"`
          default:
          return `src="img/TOS_Cast.jpg"`
        }
      }
          return `
          <div class="item">
              <a href="/star-trek-episode-finder/dist/movie.html?uid=${movie.uid}">
                    <img ${src()} alt="Screenshot from ${movie.title}">
                </a>
              <a href="/star-trek-episode-finder/dist/movie.html?uid=${movie.uid}" class="btn-dark">
                <h3>${movie.title}</h3>
              </a>
              <a href="#" class="btn-light">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </a>
            </div>`
      })
      movieList.innerHTML = movieMarkUp.join('');
    }
  }
  movieListComponent = new MovieListComponent;
  movieListComponent.getMovies();
}(window))