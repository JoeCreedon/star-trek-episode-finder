(function(){
  class CharacterListComponent{
    constructor(){
      this.uid = `uid=EPMA0000000454`;
      this.url =`http://stapi.co/api/v1/rest/episode?${this.uid}`;
    }
    
    async getCharacterList(){
      this.response = await fetch(this.url, {method: 'GET'});
      this.data = await this.response.json();
      this.renderCharacterList();
  }

  renderCharacterList(){
    const charMarkUp = this.data.episode.characters.map(character => {
      return  `
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
        </a>
        </div>
        `
    });

    const container = document.querySelector('.js-character-list-container');
    container.innerHTML = charMarkUp.join('');
  }
  
  }

  const characterList = new CharacterListComponent;
  characterList.getCharacterList();
  
}(window));