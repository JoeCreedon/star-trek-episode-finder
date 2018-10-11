(function(){

  class EpisodeInfoComponent{
    constructor(){
      this.queryParameter = window.location.search;
      this.url = `http://stapi.co/api/v1/rest/episode${this.queryParameter}`;
    }

    async getEpisodeInfo(){
      const response = await fetch(this.url, {method: 'GET'});
      this.epiInfoObject = await response.json().then(json => json.episode);
      this.renderEpisodeInfo();
      this.renderImage();
    }

    renderEpisodeInfo(){
      ///Title
      const title = this.epiInfoObject.title;
      const headerTitle = document.querySelector('.js-title');
      headerTitle.innerHTML = title;
      const episodeTitle = document.querySelector('.js-episode-title')
      episodeTitle.innerHTML = title;
      
      //Subheading
      const dates = document.querySelector('.js-episode-dates');
      dates.innerHTML = `<span class="text-secondary">Air Date: ${this.epiInfoObject.usAirDate}</span> | Star Date: ${this.epiInfoObject.stardateFrom}`;

      const seasonNumber = document.querySelector('.js-season-number');
      seasonNumber.innerHTML = `<span class="text-secondary">Season: ${this.epiInfoObject.seasonNumber}</span> | Episode: ${this.epiInfoObject.episodeNumber}`

      //Lists
      const characterList = document.querySelector('.js-episode-characters');
      const charMarkUp = this.epiInfoObject.characters.map(character => {
        return `<a href="/star-trek-episode-finder/dist/character.html?uid=${character.uid}">
              <li>${character.name}</li>
             </a>`;
      })
      characterList.innerHTML = charMarkUp.join('')
      console.log(this.epiInfoObject.writers);
      const writerList = document.querySelector('.js-episode-writers');
      const writerMarkUp = this.epiInfoObject.writers.map(writer => {
        return `<a href="/star-trek-episode-finder/dist/writer.html?uid=${writer.uid}"><li>${writer.name}</li></a>`;
      });
      writerList.innerHTML = writerMarkUp.join('');

    }

    renderImage(){
      const epiImage = document.querySelector('#episode-image');
      const src = () => {
        switch(this.epiInfoObject.series.uid){
          case 'SEMA0000097474':
          return `src="img/TOS_Cast.jpg"`
          break;
          case 'SEMA0000034504':
          return `src="img/TAS.jpg"`
          break;
          case 'SEMA0000062876':
          return `src="img/TNG.jpg"`
          break;
          case 'SEMA0000073238':
          return `src="img/DS9.jpg"`
          break;
          default:
          `src="img/farpoint.jpg"`;
        }
    }
      const imageMarkUp = `<img ${src()} alt="${this.epiInfoObject.title}" class="episode-image">`;
      epiImage.innerHTML = imageMarkUp;
    }
  }

  const epiInfo = new EpisodeInfoComponent;
  epiInfo.getEpisodeInfo();
}(window));