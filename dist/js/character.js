(function(window){

  class CharacterInfoComponent{
    constructor(){
      this.queryParameter = window.location.search;
      this.url = `http://stapi.co/api/v1/rest/character${this.queryParameter}`;
    }

    async getCharacterInfo(){
      let fetchedCharacter;
      this.response = await fetch(this.url, {method: 'GET'});
      this.data = await this.response.json()
      .then(json => {
        fetchedCharacter = json.character;
      })
      this.characterInfo = fetchedCharacter;
      ///Get info for Motion Picture because it's not in the API
      this.res = await fetch('motion_picture.json', {method: 'GET'});
      this.motionPictureData = await this.res.json();
  
      this.renderCharacterInfo();
    }

    renderCharacterInfo(){
      //Render head and title
      const name = this.characterInfo.name;
      const heading = document.querySelector('.js-title');
      heading.innerHTML = name;
      const characterName = document.querySelector('.js-character-name');
      characterName.innerHTML = name;
      
      //Render sub title
      const species = document.querySelector('.js-species');
      const speciesMarkUp = this.characterInfo.characterSpecies.map(species => { return `<span class="text-secondary">Speices:</span> ${species.name}`});
      species.innerHTML = speciesMarkUp.join(' / ');

      const affliations = document.querySelector('.js-affilations');
      const affilMarkUp = this.characterInfo.organizations.map(organization => {
        return organization.name;
      });
      affliations.innerHTML = affilMarkUp.join(' / ');

      //Lists
      const relationsList = document.querySelector('.js-character-relations')
      //filter out this character from array
      const relationsArray = this.characterInfo.characterRelations.filter(relation => (relation.target.name === this.characterInfo.name));
      const relationsMarkUp = relationsArray.map(relation => {
        return `
        <li>${relation.type}: <a href="/star-trek-episode-finder/dist/character.html?uid=${relation.source.uid}">${relation.source.name}</a></li>
        `;
      })
      relationsList.innerHTML = relationsMarkUp.join('');

      const epiList = document.querySelector('.js-character-episodes');

      const epiMarkUp = this.characterInfo.episodes.map(episode => {return `<a href="/star-trek-episode-finder/dist/episode.html?uid=${episode.uid}">
      <li>${episode.title}</li>
     </a>`})
      epiList.innerHTML = epiMarkUp.join('');
    
      if(this.characterInfo.movies[0].uid === 'MOMA0000173722'){
        this.characterInfo.movies.push(this.motionPictureData[0])
      } 
      //Movie list mark up
      const movieList = document.querySelector('.js-character-movies');
      const movieMarkUp = this.characterInfo.movies.sort((a, b) => (a.usReleaseDate > b.usReleaseDate) ? 1 : -1).map(movie => {
        return `<a href="/star-trek-episode-finder/dist/movie.html?uid=${movie.uid}"><li>${movie.title}</li></a>`;
      })
      movieList.innerHTML = movieMarkUp.join('');
    }
  }
  const characterInfo = new CharacterInfoComponent;
  characterInfo.getCharacterInfo();
  
}(window))