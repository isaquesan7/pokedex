
const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = `./config/img/pokemons/poke_${pokemon.number}.gif`

    return pokemon
}

pokeAPI.getPokemonsDetails = (pokemon) =>{
    return fetch(pokemon.url)
                            .then((response) => response.json())
                            .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
                    .then((response) => response.json())
                    .then((responseBody) => responseBody.results)
                    .then((pokemons) => pokemons.map(pokeAPI.getPokemonsDetails))
                    .then((detailRequest) => Promise.all(detailRequest))
                    .then((pokemonsDetails) => pokemonsDetails)

}