/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemons = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

const pokemonList = document.querySelector(".pokemon-container");
const searchBar = document.getElementById("search-bar");
const typeFilter = document.getElementById("type-filter");
searchBar.addEventListener("input", filterAndSortPokemons);
typeFilter.addEventListener("change", filterAndSortPokemons);

/**
 * Fonction qui affiche la liste des noms des pokémons
 */
function displayPokemons(newPokemons = pokemons) {
    if (newPokemons.length < 1) {
        pokemonList.innerHTML = `<p>Dracaufeu a tout brûlé, aucun Pokémon ne correspond à ta recherche !</p>`;
        return;
    }
    let result = '';

    for (let pokemon of newPokemons) {
        result += generatePokemonCardHTML(pokemon);
    }
    pokemonList.innerHTML = result;
}

/**
 * Fonction qui retourne le code HTML de la carte Pokémon pour l'objet Pokémon passé en paramètre
 */
function generatePokemonCardHTML(pokemon) {
    let result = '';

    // Test si le pokémon possède 2 types
    let twoTyperPokemon = pokemon.type.includes(',');

    // Ajout de la couleur de fond en fonction du nombre de types
    if (twoTyperPokemon) {
        const types = pokemon.type.split(',');
        result += `<div class="pokemon-card" style="background: linear-gradient(to right, ${typeColors[types[0]]} 50%, ${typeColors[types[1]]} 50%);">`;
    } else {
        result += `<div class="pokemon-card" style="background: ${typeColors[pokemon.type]};">`;
    }

    result += `<img src="images/${pokemon.img}" alt=${pokemon.name}><h2>${pokemon.name}</h2><div>Type: `;

    // Test si le Pokémon a plusieurs types
    if (twoTyperPokemon) {
        // Séparer les types
        const types = pokemon.type.split(',');

        result += `${types[0]} / ${types[1]}`;
    } else {
        result += `${pokemon.type}`;
    }

    result += `</div><div>Niveau: ${pokemon.level}</div></div>`;

    return result;
}

/**
 * Fonction qui gère le filtrage des pokémons par leur nom
 */
function filterAndSortPokemons() {
    // Récupère le contenu de la barre de recherche en minuscule
    let searchValue = searchBar.value.toLowerCase();

    // Retourne tous les pokémons dont le nom contient la valeur tapée dans la barre de recherche
    let nameFilteredPokemons = pokemons.filter(currentPokemon => currentPokemon.name.toLowerCase().includes(searchValue));

    if (typeFilter.value !== "Tous les types") {
        let typeFilteredPokemons = nameFilteredPokemons.filter(currentPokemon => currentPokemon.type.includes(typeFilter.value));
        displayPokemons(typeFilteredPokemons);
    } else {
        displayPokemons(nameFilteredPokemons);
    }
}

displayPokemons();
