var jsonAPI = 'https://raw.githubusercontent.com/ScriptyMind/Morrocan-Cities/master/cities.json';
var listCities = document.getElementById("listCities");
var searchInput = document.getElementById("searchBox");

// Just added to test git

const cities = [];
fetch(jsonAPI)
  .then(el => el.json())
  .then(data => cities.push(...data));

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      console.log(place);
      const regex = new RegExp(wordToMatch, 'gi');
      return place.City.match(regex) || place.Region.match(regex)
    });
  }

  function mySearchFun() {
    var matchArray = findMatches(this.value, cities);
    var html = matchArray.map(place => {
      var regex = new RegExp(this.value, 'gi');
      var cityName = place.City.replace(regex, `<span class="high">${this.value}</span>`);
      var stateName = place.Region.replace(regex, `<span class="high">${this.value}</span>`);
      return `
        <li>
          <span class="nameCity">${cityName}, ${stateName}</span>
          <span class="popu">${place.Population}</span>
        </li>
      `;
    }).join('');
    listCities.innerHTML = html;
  }

  searchInput.addEventListener('keyup', mySearchFun);

