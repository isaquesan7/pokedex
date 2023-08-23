const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadButton');

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToHtml(pokemon){
    return `
                        <li class="pokemon ${pokemon.type}">

                            <span class="number">nº${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>

                            <div class="detail">

                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>

                                <div class="pokemonIMG">
                                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                                    <img class="pokebg" src="./config/img/pokeball.svg" alt="${pokemon.name}">
                                </div> 

                            </div>
                            
                        </li>
            `
}

function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})