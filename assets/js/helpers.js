
function transformPokemon(pokemon) {
  console.log(pokemon);
  if (typeof pokemon.transformed != 'undefined') {
    return pokemon;
  }
  if (window.settings.debug) {
    console.info(pokemon);
  }
  // try and get pokedex info
  if (typeof pokedex !== 'undefined') {
    entry = pokedex.where('id', pokemon.species).first();
    if (typeof entry === 'undefined') {
      entry = {};
    }
  }
  pokemon.transformed = true;

  // handle shinies
  var url = settings.imgPaths[settings.pokeImg.usePath];
  if (settings.pokeImg.ignoreShinies === false && pokemon.isShiny == 1) {
    url = settings.imgPaths.shiny;
  }
  if (pokemon.species === -1) {
    url = settings.imgPaths.missingno;
  }

  // normalize name
  pokemon.normalizeName = pokemon.speciesName
    .toLowerCase()
    .replace(/[é]/g, 'e')
    .replace(/[^a-zA-Z0-9\♀]/g, '')
    .replace(/[\♀]/g, '-f'); // nidoran female

  // figure out which version of the filename we wanna use
  var filename = settings.pokeImg.useDexNumbers
    ? pokemon.species
    : pokemon.normalizeName;

  // handle forms
  if (settings.pokeImg.ignoreForms === false) {
    if (pokemon.alternateForm !== '' && typeof pokemon.alternateForm !== 'undefined' && pokemon.alternateForm !== 'normal') {
      filename = settings.pokemonForms[pokemon.speciesName.toLowerCase()][pokemon.alternateForm];

      if (settings.pokeImg.useDexNumbers) {
        filename = filename.replace(pokemon.speciesName, pokemon.species);
      }
    } else if (pokemon.isFemale == true && settings.pokemonForms['female'].indexOf(pokemon.speciesName.toLowerCase()) !== -1) {
      filename += '-f';
    }
  }

  pokemon.img = url;
  if (pokemon.species !== -1) {
    pokemon.img += filename+'.'+settings.pokeImg.fileType;
  }
  if (settings.pokeImg.determineEggs === false && pokemon.isEgg == true) {
    pokemon.img = settings.pokeImg.eggType === 'static'
      ? settings.imgPaths.staticEgg
      : settings.imgPaths.animatedEgg;
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
  if (pokemon.status.frz === 1) { pokemon.status.img = 'frz'.toUpperCase(); }
  if (pokemon.status.brn === 1) { pokemon.status.img = 'brn'.toUpperCase(); }
  if (pokemon.dead === true) { pokemon.status.img = 'fnt'.toUpperCase(); }

  // get data from pokedex
  if (typeof pokedex !== 'undefined') {
    if (typeof pokemon.types === 'undefined') {
      pokemon.types = [];
    }

    if (pokemon.types.length === 0 && typeof entry.type !== 'undefined') {
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
    } else {
      types = pokemon.types;
      pokemon.types = [];

      types.forEach(function(type) {
        if (type.label === null) {
          return;
        }
        pokemon.types.push({
          label: type.label,
          img: settings.imgPaths.types+type.label.toLowerCase()+'.png',
        });
      });
    }

    if (entry.length > 0 && entry.color.length) {
      pokemon.color = entry.color;
    }

    ['move1', 'move2', 'move3', 'move4'].forEach(function(move) {
      if (pokemon[move].name === '--') {
        return;
      }
      var moveEntry = movedex.where('ename', unCamelCase(pokemon[move].name)).first();
      if (typeof moveEntry !== "undefined") {
        pokemon[move].max_pp = moveEntry.pp;
        pokemon[move].type = moveEntry.type;
      }
    });
  }

  // handle item stuff
  pokemon.heldItem = {
    id: pokemon.heldItem,
    img: settings.imgPaths.items+'gen'+settings.game.generation+'/'+pokemon.heldItem+'.png',
  };
  if (typeof itemdex !== 'undefined' && itemdex.has('gen'+settings.game.generation)) {
    var item = collect(itemdex.get('gen'+settings.game.generation))
      .filter((row) => { return row.id == pokemon.heldItem.id; })
      .first();
    pokemon.heldItem.name = typeof item !== 'undefined' ? item.name : 'Unknown';
  }

  // replace the location id with text
  if (typeof locationdex !== 'undefined') {
    let game = settings.game.name
      .replace('Pokémon ', '');
    let locations = []

    if (['Fire Red','Leaf Green','Ruby','Sapphire','Emerald'].indexOf(game) !== -1) {
      locations = collect(locationdex.gen3);
    }

    if (locations.length !== 0) {
      pokemon.locationMet = locations
        .where('id', pokemon.locationMet)
        .first()
        .name;
    }
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

function hex2rgba(hex, opacity) {
  hex = hex.replace('#','');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}

function normalizeColor(str, opacity=100) {
  // hex color
  if (str.indexOf('#') !== -1) {
    return this.convertHex(str, opacity);
  }

  // if html color
  if (typeof settings.htmlColors[str] !== 'undefined') {
    return settings.htmlColors[str];
  }

  // rgb/rgba values!
  if (str.indexOf('rgb(') !== -1 || str.indexOf('rgba(') !== -1) {
    if (str.indexOf('rgb(') !== -1) {
      str = str.replace('rgb(', 'rgba(');
      str = str.replace(')', ', '+opacity/100+')');
    } else {
      str = str.replace(/[\d\.]+\)$/g, ''+opacity/100+')');
    }
  }

  // we dunno what this is, just return
  return str;
}

function string2Hex(str) {
  var colorHash = new ColorHash({lightness: 0.5});
  return colorHash.hex(str);
}

function getTypeColor(type) {
  if (typeof type !== 'string') { return 'white'; }
  if (type.len == 0) { return 'white'; }

  return settings.typeColors[type.toLowerCase()];
}
function getStatusColor(status) {
  if (typeof status !== 'string') { return 'white'; }
  if (status.len == 0) { return 'white'; }

  return settings.statusColors[status.toLowerCase()];
}
