const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonPage = document.getElementById('pokemon')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="redirectPokemonDetailPage(${pokemon.number})">
        <span class="number" id="number">#${pokemon.number}</span>
            <span class="name"  >${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

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


 function redirectPokemonDetailPage(id = 0){

    const pokemonNumber = id
    localStorage.setItem("id", pokemonNumber)
    window.location.href = "pageDetail.html"
   

}

async function showPokemonDetail(){
    idPokemon = localStorage.getItem("id")
    console.log(idPokemon)
    const pokemon = await pokeApi.getPokemonDetailNumber(idPokemon)

    const html = ` 
    <div class="pokemon ${pokemon.types[0].type.name}">
    <span class="pokemon name">${pokemon.name.toUpperCase()}</span>
    <div>
       <img src="${pokemon.sprites.other['official-artwork']?.front_default}"> 
    </div>

    <div class="grid">
        <div >
            <section>Attacks</section>
            ${pokemon.abilities[0]?.ability.name},
            ${pokemon.abilities[1]?.ability.name}
        </div>

        <div >
            <section>Types</section>
            ${pokemon.types[0]?.type.name}
        </div>

        <div>
            <section>Stats</section>
            Here stats :)
        </div>

    </div>

    </div>
    `

    console.log(html)
    return pokemonPage.innerHTML = html

}