const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadButton');
const btnModalClose = document.getElementById('btnClose');
const modalOpen = document.getElementById('modal');

const maxPage = 151;
const quantidade = 12;
let valor = 0;

function convertPokemonToHtml(pokemon){
    return `
                        <li class="pokemon ${pokemon.type} bg" onclick="abrirModal(${pokemon.number})">

                            <span class="number">nº ${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>

                            <div class="detail">

                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>

                                <div class="pokemonIMG">
                                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                                    <img class="pokebg" src="./config/img/pokeball.svg" alt="${pokemon.name}">
                                </div>
                                
                                <input id="pokeId" class="id off" type="text" value="${pokemon.number}"></input>

                            </div>
                            
                        </li>
            `
}

function convertPokemonModal(pokemon){
    return `
                <a onclick="abrirModal(false)" id="btnClose" class="btnModal"><i class="fa-solid fa-xmark"></i></a>

                <div class="contentPoke ${pokemon.type} bg">

                    <div class="info">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">nº ${pokemon.number}</span>
                    </div>

                    <div class="modalIMG">
                        <img src="./config/img/pokemons/poke_${pokemon.number}.gif" alt="${pokemon.name}">
                        <img class="pokebgModal" src="./config/img/pokeball.svg" alt="${pokemon.name}">
                    </div>

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <div class="infoStatus">

                        <ol class="statsName">
                            ${pokemon.statsName.map((statusName) => `<li class="statusName">${statusName}:</li>`).join('')}
                        </ol>

                        <ol class="stats">
                            ${pokemon.stats.map((status) => `<li class="status">${status}</li>`).join('')}
                        </ol>
                    </div>

                </div>
            `
}

function loadPokemonItens(valor, quantidade) {
    pokeAPI.getPokemons(valor, quantidade).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

function showDetails(valor, quantidade = 1) {
    pokeAPI.getPokemons(valor, quantidade).then((pokemons = []) => {
        const PokemonModal = pokemons.map(convertPokemonModal).join('')
        modalOpen.innerHTML = PokemonModal
    })
  }

loadPokemonItens(valor, quantidade);

loadMoreButton.addEventListener('click', () => {
    valor += quantidade
    const qtdTotalPag = valor + quantidade

    if (qtdTotalPag >= maxPage) {
        const newQuantidade = maxPage - valor
        loadPokemonItens(valor, newQuantidade)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(valor, quantidade)
    }
})

function abrirModal(number){
    if(number){
        modalOpen.classList.remove('off');
        modalOpen.classList.add('on');

        showDetails(number - 1);
 
    }else{
        modalOpen.classList.remove('on');
        modalOpen.classList.add('off');
        modalOpen.innerHTML = ''
    }
}
