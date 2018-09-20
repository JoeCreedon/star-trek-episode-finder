(function(window){
  const queryParameter = window.location.search;

  const url = `http://stapi.co/api/v1/rest/character${queryParameter}`;
  console.log(queryParameter);
  console.log(url)
  // const url = `http://stapi.co/api/v1/rest/character?uid=CHMA0000022794`;

  const characterName = document.querySelector('.js-character-name');

  const species = document.querySelector('.js-species');

  function fetchCharacterInfo(){
    fetch(url, {method: 'GET'}).then(response => {
      return response.json();
    }).then(json => {
      const fetchedCharacterName = json.character.name;
      console.log(json.character.characterSpecies[0].name);
      const fechedSpecies = json.character.characterSpecies[0].name;

      characterName.innerHTML = fetchedCharacterName;

      species.innerHTML = `Species: ${fechedSpecies}`;
    })
  }


  fetchCharacterInfo();
}(window))