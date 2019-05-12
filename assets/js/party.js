new Vue({
  el: '#party',
  data: {
    party: [],
    players: {},
    game: {
      name: '',
      generation: 0,
    },
    party_count: 0,
    switchSpeed: 'switchMedium',
    stats: ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'],
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
        vm.players[username] = party.map(function (pokemonWrapper) {
            let mon = pokemonWrapper.pokemon;
            if (mon == null) {
                return false;
            }

            return transformPokemon(mon);
        });

        if (username == client.currentUser) {
            vm.party = vm.players[username];
            vm.party_count = vm.party.filter(function(value) { return typeof value == "object" }).length;
        }
    })
    .on('player:trainer:updated', (payload) => { this.updateTrainerStuffs(payload)})
    ;
  },
  updated: function( ){
    var vm = this;
  },
  methods: {
    updateTrainerStuffs (payload) {
      console.log(`Trainer Update recieved for ${payload.username}`)
      console.log(payload.username, window.settings)
      if (payload.username !== settings.currentUser) return;

      this.game = {
        name: payload.trainer.game.friendlyName,
        generation: payload.trainer.game.generation,
      };

      settings.game = {
        name: payload.trainer.game.friendlyName,
        generation: payload.trainer.game.generation,
      };

    },

    styleBorder(mon) {
      var borderColor = settings.pokeImg.borderColor;
      if (borderColor === false || mon.locationMet === 0) {
        return { 'border-color': 'black' };
      }

      borderColor = borderColor.toLowerCase();
      if (borderColor === 'route') {
        return { 'border-color': this.stringToColour(mon.locationMet.toString()) };
      }

      if (borderColor === 'color') {
        return { 'border-color': mon.color };
      }

      if (borderColor === 'types') {
        var count = mon.types.length;
        var type1 = this.getTypeColor(mon.types[0].label);

        if (count === 2) {
          var type2 = this.getTypeColor(mon.types[1].label);
          return {
            'background': 'linear-gradient(to right, '+type1+' 50%, '+type2+' 50%)',
            'border-color': 'black',
          };
        }
        return { 'background': type1, 'border-color': 'black', };
      }

      return { 'border-color': 'black' };
    },
    healthBarPercent: function (pokemon) {
      if (pokemon.hp.max === pokemon.hp.current) {
        return 100;
      }

      return (100/pokemon.hp.max) * pokemon.hp.current;
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
    isBorderColorType: function() {
      return settings.pokeImg.borderColor === 'types';
    },
    getTypeColor: function(type) {
      return settings.typeColors[type.toLowerCase()];
    },
    getStatusColor: function(type) {
      return settings.statusColors[type.toLowerCase()];
    },
    stringToColour: function(str) {
      var colorHash = new ColorHash({lightness: 0.5});
      return colorHash.hex(str);
    }
  },
  computed: {
    moveIndexes () {
      return [1,2,3,4].map((index) => {
        return 'move' + index;
      });
    }
  }
});
