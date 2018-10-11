(function(window){
  const searchForm = document.querySelector('#js-search');
  const searchField = document.querySelector('#js-search-field');

  searchForm.addEventListener('submit', getUserText);

  function getUserText(e){
    e.preventDefault();
    
    const userText = searchField.value;

    apiRequest(userText);
  }

  function apiRequest(uid){
    const url = `http://stapi.co/api/v1/rest/character?uid=${uid}`;

    fetch(url, {method: 'GET'}).then(response => {
      return response.json();
    }).then(json => {
      console.log(json.character);
    })
  }
  
}(window))