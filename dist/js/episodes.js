(function(window) {

  const fakeEpisode = {
    title: 'The Inner Light'
  }

  const fakeEpisode2 = {
    title: 'Profit and Lace'
  }

  class EpisodeListComponent {
    constructor() {
      console.log('built an EpisodeListComponent')

      this.episodes = [fakeEpisode, fakeEpisode2]
    }

    fetchEpisodes() {
      // go get the episodes from the api
      const url = 'http://stapi.co/api/v1/rest/series?uid=SEMA0000097474'
      let fetchedEpisodes = []

      fetch(url, {
        method: 'GET'
      }).then(response => {
        return response.json()
      }).then(json => {
        fetchedEpisodes = json.series.episodes
        this.episodes = fetchedEpisodes
        this.renderEpisodeList()
      })
    }

    renderEpisodeList() {
      console.log('render episodes', this.episodes)

      const items = this.episodes.map(episode => {
        const markup = `
          <div class="item">
            <a href="#!">
              <img src="img/TOS_Cast.jpg" alt="Screenshot from ${episode.title}">
            </a>
            <a href="#" class="btn-dark">
              <h3>${episode.title}</h3>
            </a>
            <a href="#" class="btn-light">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </a>
          </div>
        `

        return markup
      })

      const container = document.querySelector('.js-episodes-container')

      container.innerHTML = items.join('\n')
    }
  }

  episodeList = new EpisodeListComponent()
  episodeList.fetchEpisodes()

}(window));
