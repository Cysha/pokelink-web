Vue.component( "List", {
  template: `
  <div style="display: none" :class="{ 'browser-connected' : true, 'flipped': flipped }" class="pokes">
    <transition-group :name="switchSpeed" tag="div" class="pokemon__list" v-if="loaded">
      <Pokemon v-for="index in 6-party_count" :key="index" v-if="party_count != 6 && loaded && flipped === true">
      </Pokemon>
      <Pokemon v-for="( poke, idx ) in party" v-if="typeof poke == 'object'" :key="poke.pid" :pokemon="poke">
      </Pokemon>
      <Pokemon v-for="index in 6-party_count" :key="index" v-if="party_count != 6 && loaded && flipped === false">
      </Pokemon>
    </transition-group>
    <div class="no-connection" v-if="!connected">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{settings.port}}</p>
    </div>
  </div>
`,
  data() { return {
    connected: false,
    loaded: false,
    settings: {},
    party: [],
    players: {},
    sets: [],
    party_count: 6,
    switchSpeed: 'switchMedium',
    flipped: false
  }},
  created: function () {
    this.loaded = true
    this.settings = window.settings;
    this.sets = this.settings.
    this.flipped = !!params.get('flipped')
  },
  mounted: function () {
    var vm = this;
    client.setup(settings.port, settings.currentUser+'-browser', settings.server, (username, party) => {
        vm.connected = true;

        let idList = party
          .filter(mon => typeof mon.pokemon !== 'undefined' && mon.pokemon !== null)
          .map(mon => mon.pokemon.species).join('|')

        if (this.flipped === true) {
          party == party.reverse()
        }

        fetch(`https://api.pokemontcg.io/v1/cards?setCode=${sets.join('|')}&supertype=pokemon&nationalPokedexNumber=${idList}`)
          .then(response => response.json())
          .then(cards => {
            vm.players[username] = party.map(function (pokemonWrapper) {
                let mon = pokemonWrapper.pokemon;
                if (mon == null) {
                    return false;
                }

                let transformed = transformPokemon(mon);

                try {
                  cardImages = cards
                    .cards
                    .find(card => card.nationalPokedexNumber === transformed.species)

                  transformed.img = cardImages.imageUrl
                } catch (e) {
                  // console.log(e, transformed)
                  console.log(`unknown image for ${mon.speciesName}`, cardImages)
                  console.info(cards.cards)
                }

                return transformed

            });

            if (username == client.currentUser) {
                vm.party = vm.players[username];
                vm.party_count = vm.party.filter(function(value) { return typeof value == "object" }).length;
            }
        })
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

    update( val ) {
    },
  }
});
