const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

function convertStatsPokemon(pokemonStat) {
  const stats = new Stats();
  stats.name = pokemonStat.name;

  stats.hp = pokemonStat.stats[0].stat.name;
  stats.hpValor = pokemonStat.stats[0].base_stat;

  stats.attack = pokemonStat.stats[1].stat.name;
  stats.attackValor = pokemonStat.stats[1].base_stat;

  stats.defence = pokemonStat.stats[2].stat.name;
  stats.defenceValor = pokemonStat.stats[2].base_stat;

  stats.special_attack = pokemonStat.stats[3].stat.name;
  stats.special_attackValor = pokemonStat.stats[3].base_stat;

  stats.special_defence = pokemonStat.stats[4].stat.name;
  stats.special_defenceValor = pokemonStat.stats[4].base_stat;

  stats.speed = pokemonStat.stats[5].stat.name;
  stats.speedValor = pokemonStat.stats[5].base_stat;

  stats.photo = pokemonStat.sprites.other.dream_world.front_default;
  stats.type = pokemonStat.types[0].type.name;

  return stats;
}


pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getStats = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemonData) => convertStatsPokemon(pokemonData));
};
