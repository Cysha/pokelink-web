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
      console.log(`Trainer Update recieved for ${payload.username}`)
      console.log(payload, window.settings)
      if (payload.username !== settings.currentUser) return;

    },

    styleBorder(mon) {
      var routeColor = settings.pokeImg.routeColor;
      var pokemonColor = settings.pokeImg.pokemonColor;
      var typeColor = settings.pokeImg.typeColor;

      if (routeColor == true) {
        return { 'border-color': string2Hex(mon.locationMet.toString()) };
      }

      if (pokemonColor == true) {
        return { 'border-color': mon.color };
      }

      if (typeColor == true) {
        var count = mon.types.length;
        var type1 = getTypeColor(mon.types[0].label);

        if (count === 2) {
          var type2 = getTypeColor(mon.types[1].label);
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
      return settings.pokeImg.typeColor == true;
    },

    getTypeColor: function(type) {
      return getTypeColor(type);
    },

    getStatusColor: function(status) {
      return getStatusColor(status);
    },
    string2Hex: function(str) {
      return string2Hex(str);
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
