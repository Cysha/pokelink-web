Vue.component( "List", {
  template: `
  <div style="display: none" :class="{ 'browser-connected' : true }" class="pokes">
    <transition-group :name="switchSpeed" tag="div" class="pokemon__list" v-if="loaded">
      <Pokemon v-for="( poke, idx ) in party" v-if="typeof poke == 'object'" :key="poke.nickname+poke.species" :pokemon="poke">
      </Pokemon>
      <Pokemon v-for="index in 6-party_count" :key="index" v-if="party_count != 6 && loaded">
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
    party_count: 0,
    switchSpeed: 'switchMedium'
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

    update( val ) {
    },
  }
});
