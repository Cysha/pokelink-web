new Vue({
  el: '#app',
  data: function () {
    return {
        party: [],
        players: {},
        party_count: 0
    };
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
        console.log(settings);
        vm.players[username] = party.map(function (pokemonWrapper) {
            let mon = pokemonWrapper.pokemon;
            if (mon == null) {
                return false;
            }

            // handle shinies
            var url = settings.imgPaths.normal;
            if (settings.pokeImg.ignoreShinies === false && mon.isShiny == 1) {
              url = settings.imgPaths.shiny;
            }

            // figure out which version of the filename we wanna use
            var filename = settings.pokeImg.useDexNumbers
              ? mon.species
              : mon.speciesName.toLowerCase();

            // handle forms
            if (settings.pokeImg.ignoreForms !== false) {
              if (mon.alternateForm != '') {
                filename = settings.pokemonForms[mon.speciesName.toLowerCase()][mon.alternateForm];

                if (settings.pokeImg.useDexNumbers) {
                  filename = filename.replace(mon.speciesName, mon.species);
                }
              }
              if (mon.isFemale == true && settings.pokemonForms['female'].indexOf(mon.speciesName) !== -1) {
                form = '-f';
              }
            }

            mon.img = url+filename+'.'+settings.pokeImg.fileType;
            if (!settings.pokeImg.determineEggs && mon.isEgg === true) {
              mon.img = settings.pokeImg.imgPaths.egg;
              mon.nickname = 'Egg';
            }


            if (mon.nickname == '') {
              mon.nickname = mon.speciesName;
            } else {
              mon.nickname = mon.nickname.replace(/\\u\{ffff\}.*$/, '')
            }

            if (typeof mon.status == 'undefined') {
              mon.status = 0;
            }
            if (mon.dead == true) {
              mon.status = 'fnt';
            }
            mon.status = 0;

            mon.statusImg = '/sprites/status/'+mon.status+'.png';

            return mon;
        });

        if (username == client.currentUser) {
            vm.party = vm.players[username];
            vm.party_count = vm.party.filter(function(value) { return typeof value == "object" }).length;
        }
    });
  },
  updated: function( ){
    var vm = this;
  },
  methods: {
    healthBarPercent: function (pokemon) {
      if (pokemon.maxHp === pokemon.currentHp) {
        return 100;
      }

      return (100/pokemon.maxHp) * pokemon.currentHp;
    },
    healthBarClass: function (pokemon) {
        var percent = this.healthBarPercent(pokemon);

        if (percent == 0) {
            return 'progress-bar grey';
        }
        if (percent <= 25) {
            return 'progress-bar red';
        }
        if (percent <= 50) {
            return 'progress-bar yellow';
        }

        return 'progress-bar green';
    },
    stringToColour: function(str) {
      var colorHash = new ColorHash({lightness: 0.5});
      return colorHash.hex(str);
    }
  },
  computed: {
  }
});
