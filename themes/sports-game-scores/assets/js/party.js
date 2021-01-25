new Vue({
  el: "#party",
  data() {
    return {
      connected: false,
      loaded: false,
      settings: {},
      party: [],
      players: {},
      party_count: 6,
      switchSpeed: 'switchMedium',
    }
  },
  created: function () {
    this.loaded = true
    this.settings = window.settings;
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
        vm.connected = true;

        vm.players[username] = party.map(function (pokemonWrapper, idx) {
            let mon = pokemonWrapper.pokemon;
            let loaded = false
            if (mon == null) {
                return null;
            }

            try {
              let existingPoke = this.party.filter(ePoke => ePoke.pid === mon.pid)
              console.log(existingPoke)
              if (existingPoke && existingPoke.loaded) {
                loaded = existingPoke.loaded
              }
            } catch (e) {
            }

            return {...transformPokemon(mon), loaded: loaded};
        })

        if (username == client.currentUser) {
          let oldHashedTeam = this.party.filter(poke => poke !== null).map(poke => poke.pid)
          let newHashedTeam = vm.players[username].filter(poke => poke !== null).map(poke => poke.pid)
          let lengthIsEqual = oldHashedTeam.length === newHashedTeam.length
          let valuesAreEqual= oldHashedTeam.every((value, index) => value === newHashedTeam[index])

          requestAnimationFrame(() => {
            let currentFixedTimeline = document.timeline.currentTime;
            document.getAnimations().map((tickerAnim) => {
                tickerAnim.cancel();
                tickerAnim.currentTime = currentFixedTimeline;
                tickerAnim.play();
            })
          })

          vm.party = vm.players[username];
          vm.party_count = vm.party
            .filter(function(value) { return typeof value == "object" })
            .length;
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
    markAsLoaded (poke, idx) {
      this.party = this.party.map((poke, slotIdx) => {
        if (idx === slotIdx) poke = {...poke, loaded: true}
        return poke
      })
    },

    update( val ) {
    },
  },
  computed: {
    singleSlot () {
      let params = new URLSearchParams(document.location.search.substring(1));
      if (params.has('slot')) {
        return true
      }
      return false
    },
    isLoaded () {
      let loadedPokemon = this.pokemonToShow
        .filter(slot => slot !== null)
        .filter(slot => {
          return slot.hasOwnProperty('loaded') && slot.loaded === true
        })

      return loadedPokemon.length === this.party.length
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
      let partyToShow = this.party.filter(pokemon => pokemon !== null)

      if (this.singleSlot === true) {
        return [partyToShow[this.slotId]]
      }

      if (params.has('fromSlot') && params.has('slots')) {
        return partyToShow.slice(
          parseInt(params.get('fromSlot')) - 1,
          parseInt(params.get('fromSlot')) - 1 + parseInt(params.get('slots'))
        )
      }

      return partyToShow
    },
    showEmptySlots() {

      if (this.singleSlot === true) {
        return false;
      }

      if (params.has('fromSlot') && params.has('slots')) {
        if (this.pokemonToShow.includes(false)) {
          return true;
        }
        return false;
      }

      if (this.party_count !== 6) {
        return true;
      }

      return true;
    }
  }
});
