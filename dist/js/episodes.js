(function() {

  class EpisodeListComponent {
    constructor(){
      this.uid = `uid=SEMA0000097474`;
      this.url = `http://stapi.co/api/v1/rest/series?${this.uid}`;
    }
    
    async fetchEpisodes() {
      //get episodes from api

      const response = await fetch(this.url, {
        method: 'GET'
      });
      this.epiArray = await response.json().then(data => data.series.episodes)
      
      //Sort by star date
      this.epiArray.sort((a, b) => (a.stardateFrom > b.stardateFrom) ? 1 : -1);

      this.renderEpisodesList()
   }

    renderEpisodesList() {
      const items = this.epiArray.map(episode => {
        return `
        <div class="item">
            <a href="/star-trek-episode-finder/dist/episode.html?uid=${episode.uid}">
                  <img src="img/TOS_Cast.jpg" alt="Screenshot from ${episode.title}">
              </a>
            <a href="/star-trek-episode-finder/dist/episode.html?uid=${episode.uid}" class="btn-dark">
              <h3>${episode.title}</h3>
            </a>
            <a href="#" class="btn-light">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </a>
          </div>`
      })

      const container = document.querySelector('.js-episodes-container')

      container.innerHTML = items.join('\n')
     }
  }

  episodeList = new EpisodeListComponent; 
  episodeList.fetchEpisodes()

}(window))
