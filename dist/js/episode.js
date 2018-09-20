(function(window){
  const queryParameter = window.location.search;
  const url = `http://stapi.co/api/v1/rest/episode${queryParameter}`;
  console.log(queryParameter);
  console.log(url);
  const episodeTitle = document.querySelector('.js-episode-title')

  const pageTitle = document.querySelector('.js-title');

  const dates = document.querySelector('.js-episode-dates');

  const characterList = document.querySelector('.js-episode-characters')
  
  function fetchEpisodeInfo(){
    fetch(url, {method: 'GET'}).then(res => {
      return res.json();
    }).then(json => {
      const fetchedEpisodeTitle = json.episode.title;
      
      const fetchedStarDate = json.episode.stardateFrom;
      
      const fetchedAirDate = json.episode.usAirDate

      const fetchedCharacters = json.episode.characters;

      pageTitle.innerText = fetchedEpisodeTitle;
      
      episodeTitle.innerText = fetchedEpisodeTitle;
      
      dates.innerHTML = `Air Date ${fetchedAirDate} | Star Date ${fetchedStarDate}`;
      let characterArray = fetchedCharacters.map(character => {
        return character.name
      });

      characterList.innerHTML = characterArray.join(' | ');
    })
  }
  fetchEpisodeInfo();
}(window));