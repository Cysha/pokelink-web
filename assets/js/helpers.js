
function transformPokemon(pokemon) {
  // try and get pokedex info
  if (typeof pokedex !== 'undefined') {
    entry = pokedex.where('id', pokemon.species).first();
  }

  // handle shinies
  var url = settings.imgPaths.normal;
  if (settings.pokeImg.ignoreShinies === false && pokemon.isShiny == 1) {
    url = settings.imgPaths.shiny;
  }

  // figure out which version of the filename we wanna use
  var filename = settings.pokeImg.useDexNumbers
    ? pokemon.species
    : pokemon.speciesName.toLowerCase();

  // handle forms
  if (settings.pokeImg.ignoreForms !== false) {
    if (typeof pokemon.alternateForm != 'undefined' && pokemon.alternateForm !== 'normal') {
      filename = settings.pokemonForms[pokemon.speciesName.toLowerCase()][pokemon.alternateForm];

      if (settings.pokeImg.useDexNumbers) {
        filename = filename.replace(pokemon.speciesName, pokemon.species);
      }
    }
    if (pokemon.isFemale == true && settings.pokemonForms['female'].indexOf(pokemon.speciesName) !== -1) {
      form = '-f';
    }
  }

  pokemon.img = url+filename+'.'+settings.pokeImg.fileType;
  if (!settings.pokeImg.determineEggs && pokemon.isEgg === true) {
    pokemon.img = settings.imgPaths.egg;
    pokemon.nickname = 'Egg';
  }

  if (pokemon.nickname == '') {
    pokemon.nickname = pokemon.speciesName;
  } else {
    pokemon.nickname = pokemon.nickname.replace(/\\u\{ffff\}.*$/, '')
  }

  if (typeof pokemon.status == 'undefined') {
    pokemon.status = 0;
  }
  if (pokemon.dead == true) {
    pokemon.status = 'fnt';
  }
  pokemon.status = 0;

  pokemon.statusImg = settings.imgPaths.status+pokemon.status+'.png';

  if (entry.type.length) {
    pokemon.types = [];
    entry.type.forEach(function(type) {
      pokemon.types.push({
        label: type,
        img: settings.imgPaths.types+type.toLowerCase()+'.png',
      });
    });
  }

  if (entry.color.length) {
    pokemon.color = entry.color;
  }

  return pokemon;
};

