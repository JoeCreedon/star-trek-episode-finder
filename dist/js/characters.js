(function(window){
  class CharacterListComponent{
    constructor(){
    }
    
    fetchCharacterList(){
      const url = `http://stapi.co/api/v1/rest/episode?uid=EPMA0000000454`;
      let fetchedCharacterList = []

      fetch(url, {method: 'GET'}).then(response => {
        return response.json();
      }).then(json => {
        
         const fetchedCharacterList = json.episode.characters;

         this.characterList = fetchedCharacterList;

         this.renderCharacterEpisodeList();
      })
    }

    renderCharacterEpisodeList(){
      
      const container = document.querySelector('.js-character-episodes-container');

      const items = this.characterList.map(character => {
        const markup = `<div class="episodes">
        <div class="item">
          <a href="/star-trek-episode-finder/dist/character.html?uid=${character.uid}">
            <img src="img/q.jpeg" alt="Q">
          </a>
          <a href="/star-trek-episode-finder/dist/character.html?uid=${character.uid}" class="btn-dark">
            <h3>${character.name}</h3>
          </a>
          <a href="#" class="btn-light">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </a>`

          return markup;
      })

      container.innerHTML = items.join('\n')
    }
  }

  const characterList = new CharacterListComponent;
  characterList.fetchCharacterList();
  
}(window));