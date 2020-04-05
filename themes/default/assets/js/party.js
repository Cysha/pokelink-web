new Vue({
  el: "#party",
  data() { return {
    connected: false,
    loaded: false,
    settings: {},
    party: [],
    players: {},
    party_count: 0,
    switchSpeed: 'switchMedium',
    stats: ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'],
  }},
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
  methods: {
    updateTrainerStuffs (payload) {
      if (window.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`)
        console.log(payload, window.settings)
      }
      if (payload.username !== settings.currentUser) return;
    },

    getTypeColor (type) {
      return window.getTypeColor(type)
    },
    styleBorder(pokemon) {
      var routeColor = settings.pokeImg.routeColor;
      var pokemonColor = settings.pokeImg.pokemonColor;
      var typeColor = settings.pokeImg.typeColor;

      if (routeColor == true) {
        return { 'border-color': string2Hex(pokemon.locationMet.toString()) };
      }

      if (pokemonColor == true) {
        return { 'border-color': pokemon.color };
      }

      if (typeColor == true) {
        var count = pokemon.types.length;
        var type1 = getTypeColor(pokemon.types[0].label);

        if (count === 2) {
          var type2 = getTypeColor(pokemon.types[1].label);
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
      return window.getTypeColor(type);
    },

    getStatusColor: function(status) {
      return getStatusColor(status);
    },
    string2Hex: function(str) {
      return string2Hex(str);
    }
  },
  computed: {
    singleSlot () {
      let params = new URLSearchParams(document.location.search.substring(1));
      if (params.has('slot')) {
        return true
      }
      return false
    },
    slotId () {
      let availableSlots = [1,2,3,4,5,6]
      let params = new URLSearchParams(document.location.search.substring(1));
      if (params.has('slot') && availableSlots.includes(parseInt(params.get('slot')))) {
        return params.get('slot') - 1
      }
      return 0
    },
    pokemonToShow () {
      let params = new URLSearchParams(document.location.search.substring(1));

      if (this.singleSlot === true) {
        return [this.party[this.slotId]]
      }

      if (params.has('fromSlot') && params.has('slots')) {
        return this.party.slice(
          parseInt(params.get('fromSlot')) - 1,
          parseInt(params.get('fromSlot')) - 1 + parseInt(params.get('slots'))
        )
      }

      return this.party
    },
    showEmptySlots() {
      if (this.party_count !== 6) {
        return false;
      }

      if (this.singleSlot === true) {
        return false;
      }

      if (params.has('fromSlot') && params.has('slots')) {
        return true;
      }

      return true;
    }
  }
});
