const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="pokemon-details">
                <button  data-name="${
                  pokemon.name
                }" type="button" onclick="exibirStats(this)" class="btn-details" id="btn-stats">Stats</button>
            </div>

        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function comvertStatusToLi(stat) {
  return `
  
     <div class="poke-detail ${stat.type}"id="poke-type">
  
    <h2 class="poke-name">${stat.name}</h2>
  
    <div id="align-center">
  
          <img src="${stat.photo}" id="img-pokestat">        
              
    </div>
  
          <h3 id="align-center">Stats</h3>
  
      <div id="list-content">
  
        <ol class="stats-list"  id="poke-list">
          <li class="stat-details ${stat.type}">height : ${stat.height}</li>
          <li class="stat-details ${stat.type}">weight : ${stat.weight}</li>
          <li class="stat-details ${stat.type}">${stat.hp} : ${stat.hpValor}</li>
          <li class="stat-details ${stat.type}">${stat.attack} : ${stat.attackValor}</li>
          <li class="stat-details ${stat.type}">${stat.defence} : ${stat.defenceValor}</li>
          <li class="stat-details ${stat.type}">${stat.special_attack} : ${stat.special_attackValor}</li>
          <li class="stat-details ${stat.type}">${stat.special_defence} : ${stat.special_defenceValor}</li>
          <li class="stat-details ${stat.type}">${stat.speed} : ${stat.speedValor}</li>
        </ol>
  
      </div>  
  
    </div>
  
  
    `;
}

function exibirStats(button) {
  const pokedex = document.getElementById("pokedex");
  const pokestats = document.getElementById("stats");
  const pokeName = button.getAttribute("data-name");
  const pokemonStats = document.getElementById("poke-stats");

  pokeApi.getStats(pokeName).then((stat = []) => {
    const newHtml = comvertStatusToLi(stat);
    pokemonStats.innerHTML += newHtml;
  });

  pokedex.classList.add("poke-invisible");
  pokestats.classList.remove("poke-invisible");
}


function backPokedex() {
  const pokedex = document.getElementById("pokedex");
  const pokestats = document.getElementById("stats");
  const pokemonStats = document.getElementById("poke-stats");

  pokemonStats.innerHTML = "";

  pokedex.classList.remove("poke-invisible");
  pokestats.classList.add("poke-invisible");
}
