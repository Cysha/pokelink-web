
function transformPokemon(pokemon) {
  //console.info(pokemon);
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
    if (pokemon.alternateForm !== '' && typeof pokemon.alternateForm !== 'undefined' && pokemon.alternateForm !== 'normal') {
      filename = settings.pokemonForms[pokemon.speciesName.toLowerCase()][pokemon.alternateForm];

      if (settings.pokeImg.useDexNumbers) {
        filename = filename.replace(pokemon.speciesName, pokemon.species);
      }
    }
    if (pokemon.isFemale == true && settings.pokemonForms['female'].indexOf(pokemon.speciesName) !== -1) {
      form = '-f';
    }
  }
  filename = filename.replace(/[\'\-\♂\♀]/g, '');
  filename = filename.replace(/[\♂]/g, ''); // nidoran male
  filename = filename.replace(/[\♀]/g, '-f'); // nidoran female

  pokemon.img = url+filename+'.'+settings.pokeImg.fileType;
  if (!settings.pokeImg.determineEggs && pokemon.isEgg === true) {
    pokemon.img = settings.imgPaths.egg;
    pokemon.nickname = 'Egg';
  }

  // normalize species name
  if (typeof pokemon.nickname === 'undefined' || pokemon.nickname == '') {
    pokemon.nickname = pokemon.speciesName;
  } else {
    pokemon.nickname = pokemon.nickname.replace(/\\u\{ffff\}.*$/, '');
  }

  // setup status imgs
  pokemon.status.img = '0';
  if (pokemon.status.psn === 1) { pokemon.status.img = 'psn'.toUpperCase(); }
  if (pokemon.status.slp === 1) { pokemon.status.img = 'slp'.toUpperCase(); }
  if (pokemon.status.par === 1) { pokemon.status.img = 'par'.toUpperCase(); }
  if (pokemon.status.fzn === 1) { pokemon.status.img = 'fzn'.toUpperCase(); }
  if (pokemon.status.brn === 1) { pokemon.status.img = 'brn'.toUpperCase(); }
  if (pokemon.dead === true) { pokemon.status.img = 'fnt'.toUpperCase(); }

  if (entry.type.length > 0) {
    pokemon.types = [];
    types = entry.type;

    // handle the non-fairy varient of the pokemon
    var gen5Typing = settings.pokemonForms['<gen5'][pokemon.speciesName.toLowerCase()];
    if (typeof gen5Typing != "undefined" && settings.game.generation <= 5) {
      types = [gen5Typing];
    }

    types.forEach(function(type) {
      pokemon.types.push({
        label: type,
        img: settings.imgPaths.types+type.toLowerCase()+'.png',
      });
    });
  }

  if (entry.color.length) {
    pokemon.color = entry.color;
  }

  // get move data
  if (typeof pokedex !== 'undefined') {
    ['move1', 'move2', 'move3', 'move4'].forEach(function(move) {
      if (pokemon[move].name === '--') {
        return;
      }
      var moveEntry = movedex.where('ename', unCamelCase(pokemon[move].name)).first();
      if (typeof moveEntry !== "undefined") {
        pokemon[move].max_pp = moveEntry.pp;
        pokemon[move].type = moveEntry.type;
      }
    })
  }

  // handle item stuff
  if (itemdex.has('gen'+settings.game.generation)) {
    item = collect(itemdex.get('gen'+settings.game.generation))
      .filter((row) => { return row.id == pokemon.heldItem; })
      .first();
    pokemon.heldItem = {
      id: pokemon.heldItem,
      img: settings.imgPaths.items+'gen'+settings.game.generation+'/'+pokemon.heldItem+'.png',
      name: typeof item !== 'undefined' ? item.name : 'Unknown',
    };
  }


  return pokemon;
}

function unCamelCase (str){
  if (typeof str === 'undefined' || str.len === 0) {
    return null;
  }

  return str
    // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); });
}
