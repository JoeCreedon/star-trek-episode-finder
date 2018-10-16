(function(){
  class MovieInfoComponent{
    constructor(){
      this.queryParameter = window.location.search;
      this.url = `http://stapi.co/api/v1/rest/movie${this.queryParameter}`;
    }
    async getMovieInfo(){
      this.response = await fetch(this.url, {method: 'GET'});
      this.data = await this.response.json()
      this.renderMovieInfo();
      this.renderImage();
    }

    renderMovieInfo(){
      const headerTitle = document.querySelector('.js-title');
      const title = this.data.movie.title;
      headerTitle.innerHTML = title;
      const movieTitle = document.querySelector('.js-movie-title');
      movieTitle.innerHTML = title;

      const starDate = document.querySelector('.js-star-date');
      starDate.innerHTML = `<span class="text-secondary">Star Date:</span> ${this.data.movie.stardateFrom}`;
      const releaseDate = document.querySelector('.js-release-date')
      releaseDate.innerHTML =`<span class="text-secondary">Release Date:</span> ${this.data.movie.usReleaseDate}`

      const charList = document.querySelector('.js-movie-characters');
      const charMarkUp = this.data.movie.characters.map(char => {
        return `<a href="/star-trek-episode-finder/dist/character.html?uid=${char.uid}">
              <li>${char.name}</li>
             </a>`;
      })
      charList.innerHTML = charMarkUp.join('');
      

      const writerList = document.querySelector('.js-movie-writers');
      const writerMarkUp = this.data.movie.writers.map(writer => {
        return `<a href="/star-trek-episode-finder/dist/writer.html?uid=${writer.uid}"><li>${writer.name}</li></a>`;
      });
      writerList.innerHTML = writerMarkUp.join('');

      const directorList = document.querySelector('.js-movie-directors');
      const directorMarkUp = this.data.movie.directors.map(director => {
        return `<a href="/star-trek-episode-finder/dist/director.html?uid=${director.uid}"><li>${director.name}</li></a>`;
      });
      directorList.innerHTML = directorMarkUp.join('');
      console.log(this.data.movie.directors)
    }

    renderImage(){
      const movieImage = document.querySelector('#movie-image');
      const src = () => {
        switch(this.data.movie.uid){
        case 'MOMA0000006645':
        return `src="img/STMP.jpg"`
        break;
        case 'MOMA0000173722':
        return `src="img/STII2.jpg"`
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
    const imageMarkUp = `<img ${src()} alt="${this.data.title}" class="episode-image">`;
    movieImage.innerHTML = imageMarkUp;
  }
}


  movieInfoComponent = new MovieInfoComponent;
  movieInfoComponent.getMovieInfo();
}(window))