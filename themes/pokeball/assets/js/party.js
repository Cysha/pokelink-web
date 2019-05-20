new Vue({
  el: '#party',
  data: {
    connected: false,
    loaded: false,
    settings: {},
    party: [],
    players: {},
    party_count: 0,
    switchSpeed: 'switchMedium',
    stats: ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'],
  },
  created: function () {
    this.loaded = true
    this.settings = window.settings;
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
      vm.connected = true;
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
      if (window.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`)
        console.log(payload, window.settings)
      }
      if (payload.username !== settings.currentUser) return;

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
      return settings.pokeImg.typeColor == true;
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
